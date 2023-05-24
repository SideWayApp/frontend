import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import {Marker} from 'react-native-maps';

export default function BaseMarkersComponent({wayPoints}){
    const lastIndex = Object.values(wayPoints).length-1;
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