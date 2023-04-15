import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import {Marker} from 'react-native-maps';

export default function BaseMarkersComponent({wayPoints}){
    const lastIndex = Object.values(wayPoints).length-1;
    return (
        <>
        <Marker 
            coordinate={{
                latitude: wayPoints[0].latitude,
                longitude: wayPoints[0].longitude
            }}
            title="Origin"
        />
        <Marker
            coordinate={{
                latitude: wayPoints[lastIndex].latitude,
                longitude: wayPoints[lastIndex].longitude,
            }}
            title="Destination"
        />
    </>
  );
}