import { useEffect, useState } from "react"
import { Polyline } from "react-native-maps"
import polyline from "@mapbox/polyline"
import {isWithinRadius} from '../utils';
import { useDispatch, useSelector } from "react-redux"
import { setOrigin } from "../Redux/DirectionsStore/actions"

export default function OnMapDirections({ wayPoints, polylinePoints, location,getRoute,mapRef, isWalking}) {
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [walkingTrackCoordinates, setWalkingTrackCoordinates] = useState([])
  const user = useSelector((state) => state.auth.user)
  const [lineColor, setLineColor] = useState("gray")
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

  useEffect(()=>{
    const checkData = async()=>{
      const latitude = location.latitude
      const longitude = location.longitude
      const newCoordinates = [...walkingTrackCoordinates, { latitude, longitude }]
      // console.log("New Coordinates:", newCoordinates) // Log to check the new coordinates
      setWalkingTrackCoordinates(newCoordinates)
      if (routeCoordinates){
        if (!isWithinRadius(location,routeCoordinates,30) && isWalking){
          console.log("Not in radius...")
          //const locationAddress = await getAddressFromCoordinates(location.latitude,location.longitude)
          const locationAddressObject = await mapRef.current.addressForCoordinate(location)
          const locationAddress = locationAddressObject.thoroughfare + " " + 
            locationAddressObject.name + " " + locationAddressObject.locality;
          console.log(locationAddress)
          dispatch(setOrigin(locationAddress))
          getRoute();
        }
      }  
    }
    checkData();
  },[location])



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
