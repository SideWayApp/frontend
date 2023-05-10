import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { FontAwesome } from "@expo/vector-icons";

export default function CurrentUserLocationComponent({ location }) {
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
    >
      <FontAwesome name="male" size={24} color="black" />
    </Marker>
  );
}
const styles = StyleSheet.create({
  markerContainer: {
    borderColor: "#000",
    padding: 0,
    borderRadius: 100,
  },
  iconContainer: {
    justifyContent: "center",
    width: 30,
    height: 30,
    bottom: 3,
    alignSelf: "center",
    alignItems: "center",
  },
});
