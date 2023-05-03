import React, { useState, useRef, useEffect, Fragment } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  Button,
  PermissionsAndroid,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { GOOGLE_API_KEY } from "@env";
import { FAB } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import * as Location from "expo-location";
import MapItemsComponent from "./MapItemsComponent";
import { getAddressFromLatLng } from "../axios";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BaseMarkersComponent from "./BaseMarkersComponent";
import OnMapDirections from "./OnMapDirections";
// import CurrentUserLocationComponent from "./CurrentUserLocationComponent"
import BackNavigationFabComponent from "./BackNavigationFabComponent";
import { useSelector, useDispatch } from "react-redux";
import { setDestination } from "../Redux/DirectionsStore/actions";
import { Polyline } from "react-native-maps";

import { useNavigation, useRoute } from "@react-navigation/native"

function MapComponent({
  wayPoints,
  polyline,
  isDirection,
  isGotDirection,
  setIsGotDirection,
}) {
  const { destination } = useSelector((state) => state.directions);
  const dispatch = useDispatch();

  const navigation = useNavigation()

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [location, setLocation] = useState(null);

  const [coordinates, setCoordinates] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [clickedAddress, setClickedAddress] = useState("");
  const [isFabLocationPressed, setIsFabLocationPressed] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant permission...");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getLocation();
  }, []);

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: 32.05169730746334,
    longitude: 34.76187512527052,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const [region, setRegion] = useState(INITIAL_POSITION);
  const handleRegionChangeComplete = (newRegion) => {
    // Update the current region
    setRegion(newRegion);
  };

  const moveTo = async () => {
    if (location !== null) {
      const camera = await mapRef.current.getCamera();
      if (camera) {
        const newLatitudeDelta = 0.0015;
        const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;
        const newPosition = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: newLatitudeDelta,
          longitudeDelta: newLongitudeDelta,
        };
        camera.center = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        camera.pitch = 90;
        if (isGotDirection) {
          mapRef.current.animateCamera(camera, { duration: 1000 });
          mapRef.current.animateToRegion(newPosition);
          setIsGotDirection(false);
        }
      }
    }
  };
  const handleNavigation = async () => {
    try {
      let dest = await getAddressFromLatLng(
        coordinates.latitude,
        coordinates.longitude
      );
      dispatch(setDestination(dest));
    } catch (error) {
      console.error("Could not found", error);
    }
  };

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
      setCoordinates({ latitude, longitude });
    }
    try {
      const address = await getAddressFromLatLng(latitude, longitude);
      setClickedAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnLayout = () => {
    markerRef.current.showCallout();
  };

  return (
    <View style={styles.container}>
      <MapView
        mapPadding={{ top: 0, right: 0, bottom: 0, left: 50 }}
        style={styles.map}
        initialRegion={INITIAL_POSITION}
        ref={mapRef}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPress={handleMapPress}
      >
        {isClicked && !isDirection && (
          <Marker
            coordinate={coordinates}
            pinColor="#F59F0C"
            ref={markerRef}
            onLayout={handleOnLayout}
          >
            <Callout onPress={handleNavigation}>
              <View>
                <Text>{`${coordinates.latitude.toFixed(
                  4
                )}, ${coordinates.longitude.toFixed(4)}`}</Text>
                <Text>{clickedAddress}</Text>
              </View>
              <TouchableOpacity>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Navigation to here</Text>
                </View>
              </TouchableOpacity>
            </Callout>
          </Marker>
        )}
        {isDirection && moveTo() && (
          <>
            <BaseMarkersComponent wayPoints={wayPoints} />
            <OnMapDirections wayPoints={wayPoints} polylinePoints={polyline} />
            {/* <CurrentUserLocationComponent location={location} /> */}
          </>
        )}
        <MapItemsComponent region={region} />
      </MapView>
      <BackNavigationFabComponent
        moveTo={moveTo}
        location={location}
        setIsGotDirection={setIsGotDirection}
      />
      <FAB
        style={styles.fab}
        onPress={() => navigation.navigate("Report") }
        icon={() => (
          <View style={styles.iconContainer}>
            <Icon name="plus" size={30} color="black" />
          </View>
        )}
        animated={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  markerContainer: {
    borderColor: "#000",
    padding: 0,
    borderRadius: 100,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderRadius: 100,
    backgroundColor: "lightyellow",
  },
  iconContainer: {
    justifyContent: "center",
    width: 30,
    height: 30,
    bottom: 3,
    alignSelf: "center",
    alignItems: "center",
  },
  button: {
    zIndex: 999,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
  },
  navigationButton: {
    zIndex: 999,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MapComponent;
