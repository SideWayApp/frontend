import React, { useState,useRef,useEffect } from "react";
import { View, StyleSheet, Dimensions,TouchableOpacity, Text, PermissionsAndroid } from "react-native";
import MapView ,{Marker} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from "@env";
import { getDirections } from 'react-native-google-maps-directions';
const { width, height } = Dimensions.get("window");
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0001;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 32.0853,
  longitude: 34.781769,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function MapComponent({lastIndex,isDirection,origin,destination,preference,wayPointArr}) {
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);
    const userLocation = useState(null);
    useEffect(()=>{
        const getPermissions = async () =>{
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted'){
                console.log("Please grant permission...")
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log("Location: " ,currentLocation);
        };
        getPermissions();
    },[])
    
    const moveTo = async()=>{
        const camera = await mapRef.current.getCamera();
        if (camera){
            camera.center = {latitude:wayPointArr[0].latitude, longitude:wayPointArr[0].longitude};
            mapRef.current.animateCamera(camera,{duration:1000});
        }
    }

    return (
    <View>
        <MapView style={styles.map}  initialRegion={INITIAL_POSITION} ref={mapRef}>  
            {isDirection &&  moveTo()  &&(
            <>
                <Marker coordinate={{latitude:wayPointArr[0].latitude,longitude:wayPointArr[0].longitude}} title="Origin"/>
                <Marker coordinate={{latitude:wayPointArr[lastIndex].latitude,longitude:wayPointArr[lastIndex].longitude}} title="Destination"/>
                <Marker coordinate={{latitude:location.coords.latitude,longitude: location.coords.longitude}} title="My Phone"/>
                <MapViewDirections
                    origin={{latitude:wayPointArr[0].latitude,longitude:wayPointArr[0].longitude}}
                    destination={{latitude:wayPointArr[lastIndex].latitude,longitude:wayPointArr[lastIndex].longitude}}
                    waypoints={wayPointArr}
                    apikey={GOOGLE_API_KEY} 
                    strokeWidth={3}
                    mode="WALKING"
                    strokeColor="red"
                />
            </>
        )}
        </MapView>  
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});