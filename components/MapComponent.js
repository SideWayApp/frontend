import React, { useState,useRef,useEffect } from "react";
import { View, StyleSheet, Dimensions,TouchableOpacity,Image, Text,Button, PermissionsAndroid } from "react-native";
import MapView ,{Marker,Callout} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_API_KEY } from "@env";
import { getDirections } from 'react-native-google-maps-directions';
const { width, height } = Dimensions.get("window");
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
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
    const [deltaChanged,isDeltaChanged] = useState(false);
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
    
    const deltaToMe = () => {
        const newLatitudeDelta = 0.0001;
        const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;

        // Create a new position object with the updated latitudeDelta and longitudeDelta
        const newPosition = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: newLatitudeDelta,
            longitudeDelta: newLongitudeDelta,
        };

        // Set the new position as the region of the map
        mapRef.current.animateToRegion(newPosition);    
    }

    const deltaStartNavigation = () => {
        const newLatitudeDelta = 0.001;
        const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;

        // Create a new position object with the updated latitudeDelta and longitudeDelta
        const newPosition = {
            latitude: wayPointArr[0].latitude,
            longitude: wayPointArr[0].longitude,
            latitudeDelta: newLatitudeDelta,
            longitudeDelta: newLongitudeDelta,
        };

        // Set the new position as the region of the map
        mapRef.current.animateToRegion(newPosition);    
    }

    const moveTo = async()=>{
        const camera = await mapRef.current.getCamera();
        if (camera){
            camera.center = {latitude:location.coords.latitude, longitude:location.coords.longitude};
            mapRef.current.animateCamera(camera,{duration:1000});
        }
    }
    
    return (
    <View style={styles.container}>
        <MapView style={styles.map}  initialRegion={INITIAL_POSITION} ref={mapRef}>  
            {isDirection &&  moveTo()  &&(
            <>
                <Marker coordinate={{latitude:wayPointArr[0].latitude,longitude:wayPointArr[0].longitude}} title="Origin"/>
                <Marker coordinate={{latitude:wayPointArr[lastIndex].latitude,longitude:wayPointArr[lastIndex].longitude}} title="Destination"/>
                <Marker coordinate={{latitude:location.coords.latitude,longitude: location.coords.longitude}}>
                    <Callout>
                        <View style={styles.callout}>
                            <Text>Marker Title</Text>
                            <Image source={{ uri: 'https://example.com/my-image.jpg' }} style={{ width: 200, height: 200 }} resizeMode="contain"/>
                        </View>
                    </Callout>
                </Marker>
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
        <View style={styles.buttonContainer}>
            <Button title="Back To Me" onPress={deltaToMe} />
        </View>
        {isDirection && (
            <View style={styles.buttonStartNavigation}>
                <Button title="Start Navigation" onPress={deltaStartNavigation}/>
            </View>
        )}
        
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },  
  map: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  callout: {
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  buttonStartNavigation: {
    position: 'absolute',
    top: 20,
    right: 150,
    backgroundColor: "#ff0000",
    color: "#ffffff", // set the text color of the button
  },

});