import React, {useState} from 'react'
import MapViewDirections from 'react-native-maps-directions';
import { View, StyleSheet, Dimensions } from "react-native";
import {MapView ,Marker} from "react-native-maps";
const { width, height } = Dimensions.get("window");



const MapsComponent= () =>{
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: 32.0853,
    longitude: 34.781769,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("");
  const [preference, setPreference] = useState("fastest");
  const [originCoordinates,setOriginCoordinates] = useState({x:INITIAL_POSITION.longitude, y:INITIAL_POSITION.latitude});
  const [destinationCoordinates,setDestinationCoordinates] = useState({x:INITIAL_POSITION.longitude, y:INITIAL_POSITION.latitude});
  const [wayPointArr, setWayPointsArr] = useState([]);
  
  return (
      <MapView style={{width: '100%',height: '80%',alignItems: 'center'}}  initialRegion={INITIAL_POSITION}>
        <MapViewDirections
          origin={{latitude:32.0925377,longitude:34.7897462}}
          destination={{latitude:32.1189037,longitude:34.8396364}}
          waypoints={wayPointArr}
          apikey={"AIzaSyDm0KEBdWg5Ri_G5EXX8IHieg5ZiiJDAaI"} // insert your API Key here
          strokeWidth={2}
          mode="WALKING"
          strokeColor="#111111"
        />
        <Marker coordinate={{latitude: originCoordinates.y, longitude: originCoordinates.x}} title="Origin"/>
        <Marker coordinate={{latitude: destinationCoordinates.y, longitude: destinationCoordinates.x}} title="Destination"/>
      </MapView>
  )
}

// const styles = StyleSheet.create({
//   map: {
//     width: '100%',
//     height: '80%',
//     alignItems: 'center',
//   },
// });

export default MapsComponent;