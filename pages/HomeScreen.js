import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import DirectionsComponent from "../components/DirectionsComponent";
import MapView ,{PROVIDER_GOOGLE,Marker} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
const { width, height } = Dimensions.get("window");
import { getDirections } from 'react-native-google-maps-directions';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 32.0853,
  longitude: 34.781769,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

const HomeScreen = () =>{
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("");
  const [preference, setPreference] = useState("fastest");
  const [originCoordinates,setOriginCoordinates] = useState({x:INITIAL_POSITION.longitude, y:INITIAL_POSITION.latitude});
  const [destinationCoordinates,setDestinationCoordinates] = useState({x:INITIAL_POSITION.longitude, y:INITIAL_POSITION.latitude});
  const [wayPointArr, setWayPointsArr] = useState([]);
  //provider={PROVIDER_GOOGLE}  
  return (
    <View style={styles.container}>
      <DirectionsComponent setWayPointsArr={setWayPointsArr} setOriginCoordinates={setOriginCoordinates} setDestinationCoordinates={setDestinationCoordinates} origin={origin} setOrigin={setOrigin} destination={destination} setDestination={setDestination} preference={preference} setPreference={setPreference} />
      <MapView style={styles.map}  initialRegion={INITIAL_POSITION}>

        <MapViewDirections
          origin={{latitude:32.0925377,longitude:34.7897462}}
          destination={{latitude:32.1189037,longitude:34.8396364}}
          waypoints={wayPointArr}
          apikey={"AIzaSyDm0KEBdWg5Ri_G5EXX8IHieg5ZiiJDAaI"} // insert your API Key here
          strokeWidth={4}
          mode="WALKING"
          strokeColor="#111111"
        />
        <Marker coordinate={{latitude: originCoordinates.y, longitude: originCoordinates.x}} title="Origin"/>
        <Marker coordinate={{latitude: destinationCoordinates.y, longitude: destinationCoordinates.x}} title="Destination"/>
      </MapView>
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
