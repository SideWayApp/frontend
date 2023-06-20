import React from "react";
import { StyleSheet, Text } from "react-native";
import { AppBar, IconButton, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../Redux/authenticationReducer/authActions";
import {setOrigin, setDestination} from "../Redux/DirectionsStore/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { logout } from "../axios";

function AppBarComponent({ showBackButton }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector((state) => state.auth.user);
  const isHomeInPage = route.name === "Home";

  const handleLogOut = async () => {
    const ret = await logout();
    await AsyncStorage.removeItem("token");
    console.log("Item removed successfully!");
    dispatch(setUser(null));
    dispatch(setToken(null));
    dispatch(setOrigin("Origin"));
    dispatch(setDestination("Destination"));

  };

  return (
    <AppBar
      style={styles.appbar}
      leading={(props) => {
        if (isHomeInPage) {
          if (user === null || user === undefined) {
            return (
              <IconButton
                icon={(props) => <Icon name="account" {...props} />}
                color="white"
                onPress={() => navigation.navigate("Sign In")}
              />
            );
          } else {
            if (user !== undefined) {
              return (
                <IconButton
                  icon={() => (
                    <Text style={{ color: "white", fontSize: 24 }}>
                      {user.signUpData.name.charAt(0).toUpperCase()}
                    </Text>
                  )}
                  color="white"
                  onPress={() => {
                    navigation.navigate("Home", { openProfileModal: true });
                    console.log("Profile clicked");
                  }}
                />
              );
            }
          }
        } else {
          return (
            <IconButton
              icon={(props) => <Icon name="arrow-left" {...props} />}
              color="white"
              onPress={() => navigation.goBack()}
            />
          );
        }
      }}
      trailing={(props) => {
        if (user) {
          return (
            <IconButton
              onPress={handleLogOut}
              icon={(props) => <Icon name="logout" {...props} />}
              {...props}
            />
          );
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  appbar: {
    height: 90,
    justifyContent: "flex-end",
    // marginTop: 50,
    marginBottom: 5,
    backgroundColor: "#89477b",
  },
});

export default AppBarComponent;
