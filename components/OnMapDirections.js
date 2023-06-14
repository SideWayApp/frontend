import { useEffect, useState } from "react"
import { Polyline } from "react-native-maps"
import polyline from "@mapbox/polyline"
import { isWithinRadius } from "../utils"
import { useDispatch, useSelector } from "react-redux"
import { setOrigin } from "../Redux/DirectionsStore/actions"
import { getAddressFromLatLng } from '../axios'
export default function OnMapDirections({
	wayPoints,
	polylinePoints,
	location,
	getRoute,
	mapRef,
}) {
	const [routeCoordinates, setRouteCoordinates] = useState([])
	const [walkingTrackCoordinates, setWalkingTrackCoordinates] = useState([])
	const user = useSelector((state) => state.auth.user)
	const [lineColor, setLineColor] = useState("gray")
	const [isInRadius, setIsInRadius] = useState(false)
	const { isWalking } = useSelector((state) => state.isWalking)
	const dispatch = useDispatch()

	useEffect(() => {
		if (polylinePoints) {
			const decodedPoints = polyline.decode(polylinePoints, {
				polylinePrecision: 5,
			})
			const coordinates = decodedPoints.map((point) => ({
				latitude: point[0],
				longitude: point[1],
			}))
			setRouteCoordinates(coordinates)
		}
	}, [polylinePoints])

	useEffect(() => {
		const checkData = async () => {
			const latitude = location.latitude
			const longitude = location.longitude
			const newCoordinates = [...walkingTrackCoordinates, { latitude, longitude }]
			setWalkingTrackCoordinates(newCoordinates)
			if (routeCoordinates) {
				if (isWalking) {
					const distance = await isWithinRadius(location, routeCoordinates, 40);
					setIsInRadius(distance)
					if (!isInRadius) {
						const newLocation  = await getAddressFromLatLng(latitude, longitude)
						dispatch(setOrigin(newLocation))
						await getRoute()
					}
				}
			}
		}
		checkData()
	}, [location, isInRadius, isWalking])

	useEffect(() => {
		if (user && user.preferences) {
			const { accessibility, clean, scenery, security, speed } = user.preferences
			const colorMapping = {
				accessibility: "green",
				clean: "blue",
				scenery: "yellow",
				security: "orange",
				speed: "red",
			}

			Object.keys(user.preferences).forEach((option) => {
				if (user.preferences[option]) {
					setLineColor(colorMapping[option])
				}
			})
		}
	}, [user])

	return (
		<>
			<Polyline
				coordinates={routeCoordinates}
				strokeWidth={8}
				mode="WALKING"
				strokeColor={lineColor}
			/>
			<Polyline
				coordinates={walkingTrackCoordinates}
				strokeWidth={5}
				strokeColor="black"
			/>
		</>
	)
}
