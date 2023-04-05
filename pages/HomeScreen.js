import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DirectionsComponent from "../components/DirectionsComponent";
import MapComponent from '../components/MapComponent';
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
      <MapComponent lastIndex={lastIndex} isDirection={isDirection} origin={origin} destination={destination} preference={preference} wayPointArr={wayPointArr}/>
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
