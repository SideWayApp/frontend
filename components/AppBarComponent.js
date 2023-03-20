import React from "react";
import { StyleSheet } from "react-native";
import { AppBar, IconButton, Avatar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

function AppBarComponent() {
  return (
    <AppBar
      style={styles.appbar}
      leading={(props) => (
        <IconButton
          icon={(props) => <Icon name="account" {...props} />}
          color="white"
        />
      )}
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
    marginBottom: 15,
  },
});

export default AppBarComponent;
