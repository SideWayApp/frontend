import { View, Text } from 'react-native'
import React, {useEffect,useState} from 'react'
import {Marker} from 'react-native-maps';
import * as geolib from 'geolib';
import polyline from "@mapbox/polyline"

export default function BaseMarkersComponent({wayPoints,polylinePoints,location}){
    const [routeCoordinates, setRouteCoordinates] = useState([])
    
    const lastIndex = Object.values(wayPoints).length-1;
    
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

    const point1 = {latitude:wayPoints[0].start.latitude, longitude: wayPoints[0].start.longitude}
    const point2 = {latitude: wayPoints[lastIndex].end.latitude,longitude: wayPoints[lastIndex].end.longitude}
    const point3 = {latitude: location.latitude, longitude: location.longitude}
    const point4 = {latitude: wayPoints[4].start.latitude, longitude: wayPoints[4].start.longitude}
    // console.log("is ok = " + geolib.isPointInPolygon(point4,routeCoordinates))
    // const distance = geolib.getDistance(point1,point4)
    // console.log(`First point = (${point1.latitude},${point1.longitude}) , Second Point = (${point4.latitude},${point3.longitude}), Distance = ${distance} meters`)
    
    const radius = 50; // Radius in meters

    const isWithinRadius = (point,routeCoordinates) =>{
        return routeCoordinates.some(coord => {
            const distance = geolib.getDistance(point, coord);
            return distance <= radius;
        });    
    }
    console.log("Is within radius:", isWithinRadius(point3,routeCoordinates));

    
    return (
        <>
        <Marker 
            coordinate={{
                latitude: wayPoints[0].start.latitude,
                longitude: wayPoints[0].start.longitude
            }}
            title="Origin"
            pinColor="#008080"
        />
        <Marker
            coordinate={{
                latitude: wayPoints[lastIndex].end.latitude,
                longitude: wayPoints[lastIndex].end.longitude,
            }}
            title="Destination"
            pinColor="#FF7F50"
        />
    </>
  );
}