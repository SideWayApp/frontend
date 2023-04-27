import React from "react";
import { StyleSheet, Text } from "react-native";
import { AppBar, IconButton, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../Redux/authenticationReducer/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AppBarComponent({ showBackButton }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector((state) => state.auth.user);
  const isHomeInPage = route.name === "Home";

  const handleMenuPreesed = async () => {
    await AsyncStorage.removeItem("token");
    console.log("Item removed successfully!");
    dispatch(setUser(null));
    dispatch(setToken(null));
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
            return (
              <IconButton
                icon={() => (
                  <Text style={{ color: "white", fontSize: 24 }}>
                    {user.email.charAt(0).toUpperCase()}
                  </Text>
                )}
                color="white"
                onPress={() => console.log("create user feed")}
              />
            );
          }
        } else {
          return (
            <IconButton
              icon={(props) => <Icon name="keyboard-backspace" {...props} />}
              color="white"
              onPress={() => navigation.goBack()}
            />
          );
        }
      }}
      trailing={(props) => (
        <IconButton
          onPress={handleMenuPreesed}
          icon={(props) => <Icon name="dots-horizontal" {...props} />}
          {...props}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  appbar: {
    height: 50,
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 5,
  },
});

export default AppBarComponent;
