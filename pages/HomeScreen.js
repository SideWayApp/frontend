import React, { useState,useRef } from "react";
import { View, StyleSheet, Dimensions,TouchableOpacity, Text } from "react-native";
import DirectionsComponent from "../components/DirectionsComponent";
import MapView ,{PROVIDER_GOOGLE,Marker} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
const { width, height } = Dimensions.get("window");

import { getDirections } from 'react-native-google-maps-directions';
import { Navigation, Colors } from 'react-native-maps-navigation';

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00001;
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
  const [isDirection,setIsDirection] = useState(false)
  const [wayPointArr, setWayPointsArr] = useState([]);  

  const lastIndex = wayPointArr.length-1;
  
  return (
    <View style={styles.container}>
      <DirectionsComponent isDirection={isDirection} setIsDirection={setIsDirection} setWayPointsArr={setWayPointsArr} origin={origin} setOrigin={setOrigin} destination={destination} setDestination={setDestination} preference={preference} setPreference={setPreference} />
      <MapView style={styles.map}  initialRegion={INITIAL_POSITION}>  
      {isDirection &&  
        <>
          <Marker coordinate={{latitude:wayPointArr[0].latitude,longitude:wayPointArr[0].longitude}} title="Origin"/>
          <Marker coordinate={{latitude:wayPointArr[lastIndex].latitude,longitude:wayPointArr[lastIndex].longitude}} title="Destination"/>
          <Marker coordinate={{latitude: wayPointArr[2].latitude, longitude: wayPointArr[2].longitude}} title="You" icon={require("../smallicon1.jpg")} style={{height:20,width:20}}/>
          <MapViewDirections
            origin={{latitude:wayPointArr[0].latitude,longitude:wayPointArr[0].longitude}}
            destination={{latitude:wayPointArr[lastIndex].latitude,longitude:wayPointArr[lastIndex].longitude}}
            waypoints={wayPointArr}
            apikey={GOOGLE_API_KEY} 
            strokeWidth={3}
            mode="WALKING"
            strokeColor="black"
          />
        </>
      }
    </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
  markerImage:{
    width: "5",
    height: "5",
    borderRadius:"20",
  },
  button: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'blue',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
