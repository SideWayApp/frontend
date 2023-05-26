import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { FAB } from "react-native-paper";
import * as Location from "expo-location";
import MapItemsComponent from "./MapItemsComponent";
import { getAddressFromLatLng, getAddressFromCoordinates } from "../axios";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BaseMarkersComponent from "./BaseMarkersComponent";
import OnMapDirections from "./OnMapDirections";
import BackNavigationFabComponent from "./BackNavigationFabComponent";
import { useDispatch } from "react-redux";
import { setDestination } from "../Redux/DirectionsStore/actions";
import { useNavigation } from "@react-navigation/native";
import MapClickedMarker from "./MapClickedMarker";
import CurrentUserLocationComponent from "./CurrentUserLocationComponent";
import LittleInstructions from "./LittleInstructions";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function MapComponent({
  wayPoints,
  polyline,
  isDirection,
  setIsGotDirection,
  duration,
  distance,
  changeDelta,
  getRoute,
  isWalking,
  setIsWalking
}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isMapClicked, setIsMapClicked] = useState(false);
  const [clickedAddress, setClickedAddress] = useState("");
  const [initialPosition, setInitialPosition] = useState(null);
  const [lockMap, setLockMap] = useState(true);
  const [region, setRegion] = useState(null);

  const handleRegionChangeComplete = (newRegion) => {
    if (newRegion.latitudeDelta && newRegion.longitudeDelta) {
      // const newLatitudeDelta = 0.001;
        // const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;
        // const latitudeDelta = newRegion.latitudeDelta.toFixed(4);
        // const longitudeDelta = newRegion.longitudeDelta.toFixed(4);  
        // console.log("Region changed", longitudeDelta, latitudeDelta);
        // console.log("new",newLongitudeDelta, " ", newLatitudeDelta);
        // if(latitudeDelta <= newLatitudeDelta.toFixed(4) || longitudeDelta <= newLongitudeDelta.toFixed(4)){
        //  // setLockMap(true)
        // } 
        
        // else {
        //  // setLockMap(false)
        // }
		setRegion(newRegion);
    }
  };

  const goToCurrentLocation = () => {
    if (location) {
      setLockMap(true);
      if(isDirection){
        setIsWalking(true);
      }
      const { heading, latitude, longitude } = location;
      const newLatitudeDelta = 0.002;
      const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;
      const newPosition = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      };
      mapRef.current.animateToRegion(newPosition);
      handleRegionChangeComplete({ latitude: latitude, longitude: longitude });
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
    if (isMapClicked) {
      setIsMapClicked(false);
    } else {
      setIsMapClicked(true);
      setCoordinates({ latitude, longitude });
    }
    try {
      const address = await getAddressFromCoordinates(latitude, longitude);
      setClickedAddress(address);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnLayout = () => {
    markerRef.current.showCallout();
  };

  useEffect(() => {
    const asyncLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant permission...");
        return;
      } else {
        Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 10000,
            distanceInterval: 5,
          },
          (curLocation) => {
            const { latitude, longitude, heading } = curLocation.coords;
            setLocation({
              latitude: latitude,
              longitude: longitude,
              heading: heading,
            });
          }
        );
      }
    };
    asyncLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude, heading } = location;
      if (initialPosition === null) {
        const data = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setInitialPosition(data);
      }
    }
  }, [location]);

  useEffect(() => {
    if (changeDelta) {
      const edgePadding = {
        top: 100,
        right: 100,
        bottom: 100,
        left:100,
      };
      mapRef.current?.fitToCoordinates(changeDelta, {
        edgePadding:edgePadding,
        animated: true,
      });
    }
  }, [changeDelta]);

  return (
    <View style={styles.container}>
      {initialPosition && (
        <>
          <MapView
            style={styles.map}
            initialRegion={initialPosition}
            ref={mapRef}
            onRegionChangeComplete={handleRegionChangeComplete}
            onPress={handleMapPress}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {location && (
              <CurrentUserLocationComponent location={location} />
            )}
            {isMapClicked && !isDirection && (
              <MapClickedMarker
                handleNavigation={handleNavigation}
                handleOnLayout={handleOnLayout}
                coordinates={coordinates}
                markerRef={markerRef}
                clickedAddress={clickedAddress}
              />
            )}
            {isDirection && (
              <>
                <BaseMarkersComponent
                  wayPoints={wayPoints}
                  polylinePoints={polyline}
                  location={location}
                />
                <OnMapDirections
                  wayPoints={wayPoints}
                  polylinePoints={polyline}
                  location={location}
                  getRoute={getRoute}
                  mapRef={mapRef}
                  isWalking={isWalking}
                />
              </>
            )}
            {region && <MapItemsComponent region={region} />}
          </MapView>
          <View style={[styles.container, isDirection && styles.containerHigher]}>
            <BackNavigationFabComponent
              moveTo={goToCurrentLocation}
              location={location}
              setIsGotDirection={setIsGotDirection}
            />
            <FAB
              style={styles.fab}
              onPress={() =>
                navigation.navigate("Report", { location: location })
              }
              icon={() => (
                <View style={styles.iconContainer}>
                  <Icon name="plus" size={30} color="black" />
                </View>
              )}
              animated={false}
            />
          </View>

          {isDirection && (
            <LittleInstructions
              duration={duration}
              distance={distance}
            ></LittleInstructions>
          )}
        </>
      )}
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
  containerHigher: {
    marginTop: -200,
  },
});

export default MapComponent;