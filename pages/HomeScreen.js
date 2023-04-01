import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DirectionsComponent from "../components/DirectionsComponent";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 32.0853,
  longitude: 34.781769,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

function HomeScreen() {
  const [origin, setOrigin] = useState({});
  // const [destination, setDestination] = useState({});
  return (
    <View style={styles.container}>
      <DirectionsComponent />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      />
      {/* <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Search"
          debounce={400}
          onPress={(data, details = null) => {
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            });
            console.log(details);
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 0,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});

export default HomeScreen;
