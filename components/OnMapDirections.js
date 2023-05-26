import { useEffect, useState } from "react"
import { Polyline } from "react-native-maps"
import polyline from "@mapbox/polyline"
import { useSelector } from "react-redux"

export default function OnMapDirections({ wayPoints, polylinePoints, location }) {
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [walkingTrackCoordinates, setWalkingTrackCoordinates] = useState([])
  const user = useSelector((state) => state.auth.user)
  const [lineColor, setLineColor] = useState("gray")

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
    const latitude = location.latitude
    const longitude = location.longitude
    const newCoordinates = [...walkingTrackCoordinates, { latitude, longitude }]
    console.log("New Coordinates:", newCoordinates) // Log to check the new coordinates
    setWalkingTrackCoordinates(newCoordinates)
  }, [polylinePoints, location])

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

  console.log("Walking Track Coordinates:", walkingTrackCoordinates) // Log to check the walking track coordinates

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
