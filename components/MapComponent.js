import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  Button,
  PermissionsAndroid
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "@env";
import { getDirections } from "react-native-google-maps-directions";
const { width, height } = Dimensions.get("window");
// import Geolocation from 'react-native-geolocation-service';
import * as Location from "expo-location";
import MapItemsComponent from "./MapItemsComponent";

export default function MapComponent({
  lastIndex,
  isDirection,
  origin,
  destination,
  preference,
  wayPointArr,
  setIsGotDirection,
  isGotDirection,
}) {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const userLocation = useState(null);
  const [deltaChanged, isDeltaChanged] = useState(false);
  const [isNavigationStarted, setIsNavigationStarted] = useState(false);
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant permission...");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: 32.05169730746334,
    longitude: 34.76187512527052,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  };
  const [region, setRegion] = useState(INITIAL_POSITION);
  const handleRegionChangeComplete = (newRegion) => {
    // Update the current region
    setRegion(newRegion);
  };

  const deltaToMe = () => {
    const newLatitudeDelta = 0.001;
    const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;

    // Create a new position object with the updated latitudeDelta and longitudeDelta
    const newPosition = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: newLatitudeDelta,
      longitudeDelta: newLongitudeDelta
    };

    // Set the new position as the region of the map
    mapRef.current.animateToRegion(newPosition);
  };

  const calculateHeading = (lat1, lon1, lat2, lon2) => {
    const dLon = lon2 - lon1;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x =
      Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const brng = (Math.atan2(y, x) * 180) / Math.PI;
    return brng >= 0 ? brng : 360 + brng;
  };

  const deltaStartNavigation = async () => {
    setIsNavigationStarted(true);
    const camera =  await mapRef.current.getCamera();
    setTimeout(() => {
      const newLatitudeDelta = 0.001;
      const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;
      const newPosition = {
        // latitude: location.coords.latitude,
        // longitude: location.coords.longitude,
        latitude:wayPointArr[0].latitude,
        longitude: wayPointArr[0].longitude,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta
    };

    // Set the new position as the region of the map
    if (camera) {
    mapRef.current.animateToRegion(newPosition);
    }
  }, 1000);
  };

  const moveTo = async () => {
    const camera = await mapRef.current.getCamera();
    if (camera) {
      camera.center = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
      if (isGotDirection){
        mapRef.current.animateCamera(camera, { duration: 1000 });
        setIsGotDirection(false)
      }
    }
  };

  const [coordinates, setCoordinates] = useState(null);
  const [isClicked,setIsClicked] = useState(false);
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setIsClicked(true);
    setCoordinates({ latitude, longitude });
    console.log("coordinates = ")
    console.log(coordinates);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_POSITION}
        ref={mapRef}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPress={handleMapPress}
      >
      {isClicked && (
          <Marker
            coordinate={coordinates}
            title={`${coordinates.latitude.toFixed(4)},${coordinates.longitude.toFixed(4)}`}
          />
        )}
        {isDirection && moveTo() &&(
          <>
            <Marker
              coordinate={{
                latitude: wayPointArr[0].latitude,
                longitude: wayPointArr[0].longitude
              }}
              title="Origin"
            />
            <Marker
              coordinate={{
                latitude: wayPointArr[lastIndex].latitude,
                longitude: wayPointArr[lastIndex].longitude
              }}
              title="Destination"
            />
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }}
              title="My Phone"
            />
            <MapViewDirections
              origin={{
                latitude: wayPointArr[0].latitude,
                longitude: wayPointArr[0].longitude
              }}
              destination={{
                latitude: wayPointArr[lastIndex].latitude,
                longitude: wayPointArr[lastIndex].longitude
              }}
              waypoints={wayPointArr}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              mode="WALKING"
              strokeColor="red"
            />
          </>
        )}
        <MapItemsComponent region={region} />
      </MapView>
      {isDirection && (
        <>
          <TouchableOpacity style={styles.buttonContainer} onPress={deltaToMe}>
            <Text>Back To Me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStartNavigation}
            onPress={deltaStartNavigation}
          >
            <Text>
              {isNavigationStarted ? "Back To Navigation" : "Start Navigation"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  map: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  callout: {
    alignItems: "center",
    textAlign: "center"
  },
  buttonContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#ff0",
    padding: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10
  },
  buttonStartNavigation: {
    position: "absolute",
    top: 20,
    right: 150,
    padding: 10,
    shadowOpacity: 10,
    backgroundColor: "lightgreen",
    color: "#ffffff", // set the text color of the button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10
  },
  coordinatesContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  coordinatesText: {
    fontSize: 16,
  },
});
