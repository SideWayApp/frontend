import React from "react";
import { StyleSheet } from "react-native";
import { AppBar, IconButton, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

function AppBarComponent({ showBackButton }) {
  const navigation = useNavigation();
  const route = useRoute();

  const isSignInPage = route.name === "Sign In";

  return (
    <AppBar
      style={styles.appbar}
      leading={(props) => {
        if (!isSignInPage) {
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
              icon={(props) => <Icon name="keyboard-backspace" {...props} />}
              color="white"
              onPress={() => navigation.goBack()}
            />
          );
        }
      }}
      trailing={(props) => (
        <IconButton
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
