import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import DirectionsComponent from "../components/DirectionsComponent";
import MapComponent from "../components/MapComponent";
import { useSelector, useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../Redux/DirectionsStore/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "../axios";
import { setUser } from "../Redux/authenticationReducer/authActions";
import InstructionsComponent from "../components/InstructionsComponent";

const HomeScreen = () => {
  const { origin, destination } = useSelector((state) => state);
  const [preference, setPreference] = useState("fastest");
  const [wayPoints, setWayPoints] = useState([]);
  const [isDirection, setIsDirection] = useState(false);
  const [isGotDirection, setIsGotDirection] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAsyncToken = async () => {
      const asyncToken = await AsyncStorage.getItem("token");
      if (asyncToken !== null) {
        const user = await getUserData(asyncToken);
        dispatch(setUser(user));
      }
    };
    fetchAsyncToken();
  }, [token]);

  return (
    <View style={styles.container}>
      {!isDirection && (
        <DirectionsComponent
          origin={origin}
          destination={destination}
          preference={preference}
          setWayPoints={setWayPoints}
          setIsDirection={setIsDirection}
          setIsGotDirection={setIsGotDirection}
        />
      )}
      {isDirection && <InstructionsComponent instructions={wayPoints} />}
      <MapComponent
        wayPoints={wayPoints}
        isDirection={isDirection}
        setIsGotDirection={setIsGotDirection}
        isGotDirection={isGotDirection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
    alignItems: "center",
  },
  markerImage: {
    width: "5",
    height: "5",
    borderRadius: "20",
  },
  button: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
