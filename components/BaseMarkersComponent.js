import { View, Text } from 'react-native'
import React, {useEffect,useState} from 'react'
import {Marker} from 'react-native-maps';
import * as geolib from 'geolib';
import polyline from "@mapbox/polyline"

export default function BaseMarkersComponent({wayPoints,polylinePoints,location,isWalking}){
    const lastIndex = Object.values(wayPoints).length-1;
    const [originPoint, setOriginPoint] = useState({
        latitude: wayPoints[0].start.latitude,
        longitude: wayPoints[0].start.longitude
    })
    if (isWalking){
        setOriginPoint({
            latitude: location.latitude,
            longitude: location.longitude
        })
    }
    return (
        <>
        <Marker 
            coordinate={originPoint}
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