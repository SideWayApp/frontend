import { GOOGLE_API_KEY } from "@env"
import { useEffect, useState } from "react"
import { Polyline } from "react-native-maps"
import MapViewDirections from "react-native-maps-directions"
import polyline from "@mapbox/polyline"
import { useSelector } from "react-redux"

export default function OnMapDirections({ wayPoints, polylinePoints }) {
	const [routeCoordinates, setRouteCoordinates] = useState([])
	const user = useSelector((state) => state.auth.user)
	const [LineColor, setLineColor] = useState("gray")

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
		<Polyline
			coordinates={routeCoordinates}
			strokeWidth={8}
			mode="WALKING"
			strokeColor={LineColor}
		/>
	)
}
