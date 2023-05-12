import React, { useState, useRef, useEffect, Fragment } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { FAB } from "react-native-paper";
const { width, height } = Dimensions.get("window");
import * as Location from "expo-location";
import MapItemsComponent from "./MapItemsComponent";
import { getAddressFromLatLng, getAddressFromCoordinates } from "../axios";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BaseMarkersComponent from "./BaseMarkersComponent";
import OnMapDirections from "./OnMapDirections";
// import CurrentUserLocationComponent from "./CurrentUserLocationComponent"
import BackNavigationFabComponent from "./BackNavigationFabComponent";
import { useDispatch } from "react-redux";
import { setDestination } from "../Redux/DirectionsStore/actions";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapClickedMarker from "./MapClickedMarker";
import CurrentUserLocationComponent from "./CurrentUserLocationComponent";

function MapComponent({ wayPoints, polyline, isDirection, setIsGotDirection }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isMapClicked, setIsMapClicked] = useState(false);
  const [clickedAddress, setClickedAddress] = useState("");
  const [initialPosition, setInitialPosition] = useState(null);
  const [region, setRegion] = useState(null);
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const handleRegionChangeComplete = (newRegion) => {
    // Update the current region
    setRegion(newRegion);
  };

  const goToCurrentLocation = async () => {
    if (location) {
      const newLatitudeDelta = 0.0025;
      const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;
      const newPosition = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      };
      // mapRef.current.animateToRegion(newPosition);

      const { heading } = location;
      console.log(location);

      mapRef.current.animateCamera(
        {
          center: newPosition,
          // {
          //   latitude: location.latitude,
          //   longitude: location.longitude,
          // },
          heading: heading,
          // pitch: 0,
          zoom: 21,
        },
        { duration: 1000 }
      );
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
    if (isDirection) goToCurrentLocation();
  }, [isDirection]);

  useEffect(() => {
    const asyncLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant permission...");
        return;
      } else {
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 10,
          },
          (curLocation) => {
            const { latitude, longitude } = curLocation.coords;
            if (!initialPosition) {
              const data = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              };
              setInitialPosition(data);
              setRegion(data);
              // do something with the latitude and longitude
              console.log("location is " + latitude + " and " + longitude);
              console.log(curLocation.coords.heading);
              setLocation({ latitude: latitude, longitude: longitude });
            }
          }
        );
      }
    };
    asyncLocation();
  }, []);

  return (
    <View style={styles.container}>
      {initialPosition && (
        <>
          <MapView
            mapPadding={{ top: 0, right: 0, bottom: 0, left: 50 }}
            style={styles.map}
            initialRegion={initialPosition}
            ref={mapRef}
            onRegionChangeComplete={handleRegionChangeComplete}
            onPress={handleMapPress}
          >
            {location && <CurrentUserLocationComponent location={location} />}
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
                <BaseMarkersComponent wayPoints={wayPoints} />
                <OnMapDirections
                  wayPoints={wayPoints}
                  polylinePoints={polyline}
                />
                {/* <CurrentUserLocationComponent location={location} /> */}
              </>
            )}
            {region && <MapItemsComponent region={region} />}
          </MapView>
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
});

export default MapComponent;
