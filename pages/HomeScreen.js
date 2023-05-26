import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import DirectionsComponent from "../components/DirectionsComponent";
import MapComponent from "../components/MapComponent";
import { useSelector, useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../Redux/DirectionsStore/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "../axios";
import { setToken, setUser } from "../Redux/authenticationReducer/authActions";
import InstructionsComponent from "../components/InstructionsComponent";
import { useRoute } from "@react-navigation/native";
import {renderRoute,calculateDeltasAndAverage} from "../utils";

import {
  ProfileModal,
  UpdatePrefrencesModal,
  EditProfileModal,
} from "../components/AuthFormsComponents";

const HomeScreen = () => {
  const { origin, destination } = useSelector((state) => state);
  const [preference, setPreference] = useState("fastest");
  const [wayPoints, setWayPoints] = useState([]);
  const [polyline, setPolyline] = useState(null);
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  const [isDirection, setIsDirection] = useState(false);
  const [isGotDirection, setIsGotDirection] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =  useState(false);
  const [isEditPrefrencesModalVisible, setIsEditPrefrencesModalVisible] = useState(false);
  const [changeDelta, setDelta] = useState(null);


  const route = useRoute();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleProfileModalClose = () => {
    setIsProfileModalVisible(false);
  };

  const handlePrefrencesModalClose = (pref) => {
    console.log(pref);
    setIsEditPrefrencesModalVisible(false);
  };

  const handleEditProfileModalClose = () => {
    setIsEditProfileModalVisible(false);
  };

  const getRoute = async ()=>{
    console.log("Get Route");
    await renderRoute(setWayPoints,setPolyline,setIsDirection,setIsGotDirection,setDistance,setDuration);

  }

  useEffect(()=>{
    if(wayPoints.length > 0) {
      const coordinate1 = wayPoints[0].start;
      const coordinate2 = wayPoints[wayPoints.length-1].end;
      setDelta([coordinate1,coordinate2]);
    }
  },[wayPoints])

  useEffect(() => {
    if (
      route.params?.openEditProfileModal &&
      route.params.openEditProfileModal === true
    ) {
      handleProfileModalClose();
      setIsEditProfileModalVisible(true);
    }
    if (
      route.params?.openUpdatePrefrencesModal &&
      route.params.openUpdatePrefrencesModal === true
    ) {
      handleProfileModalClose();
      setIsEditPrefrencesModalVisible(true);
    }
    if (
      route.params?.openProfileModal &&
      route.params.openProfileModal === true
    ) {
      setIsProfileModalVisible(true);
    }
  }, [route.params]);

  useEffect(() => {
    const fetchAsyncToken = async () => {
      const asyncToken = await AsyncStorage.getItem("token");
      if (asyncToken) {
        const tokens = JSON.parse(asyncToken);
        dispatch(setToken(tokens));
      }
    };
    fetchAsyncToken();
  }, []);

  useEffect(() => {
    if (user) {
      setPreference(user.preferences);
      if(isDirection){
        getRoute();
      }else {
        console.log("false");
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      await getUserData(token);
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <View
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <EditProfileModal
        isVisible={isEditProfileModalVisible}
        onClose={handleEditProfileModalClose}
      />
      <UpdatePrefrencesModal
        isVisible={isEditPrefrencesModalVisible}
        onClose={handlePrefrencesModalClose}
      />
      <ProfileModal
        isVisible={isProfileModalVisible}
        onClose={handleProfileModalClose}
      />
      {!isDirection && (
        <DirectionsComponent
          // origin={origin}
          // destination={destination}
          // preference={preference}
          getRoute={getRoute}
          // setWayPoints={setWayPoints}
          // setPolyline={setPolyline}
          // setIsDirection={setIsDirection}
          // setIsGotDirection={setIsGotDirection}
          // setDistance={setDistance}
          // setDuration={setDuration}
        />
      )}
      {isDirection && (
        <InstructionsComponent
          instructions={wayPoints}
          duration={duration}
          distance={distance}
          setIsDirections={setIsDirection}
        />
      )}
      <MapComponent
        wayPoints={wayPoints}
        polyline={polyline}
        isDirection={isDirection}
        setIsGotDirection={setIsGotDirection}
        isGotDirection={isGotDirection}
        duration={duration}
        distance={distance}
        changeDelta={changeDelta}
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