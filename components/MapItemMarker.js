import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const MapItemMarker = ({ mapItem }) => {
  let icon = "alert-octagon";

  switch (mapItem.type) {
    case "Beach":
      icon = "beach";
      break;
    case "Camera":
      icon = "camera";
      break;
    case "Dangerous Building":
      icon = "home-variant";
      break;
    case "Defibrillator":
      icon = "heart-flash";
      break;
    case "Fountain":
      icon = "water";
      break;
    case "Light Post":
      icon = "lightbulb-on";
      break;
    case "MADA Station":
      icon = "bus-stop-covered";
      break;
    case "Museum":
      icon = "bank";
      break;
    case "Polluted Area":
      icon = "cloud-alert";
      break;
    case "Shelter":
      icon = "home-group";
      break;
    case "Public WIFI Hotspots":
      icon = "wifi";
      break;
    case "Blocked":
      icon = "minus-circle-outline"; 
      break;
    case "Danger":
      icon = "close-octagon"; 
      break;
    case "Flood":
      icon = "waves-arrow-up"; 
      break;
    case "Protest":
      icon = "account-group"; 
      break;
    case "Poop":
      icon = "emoticon-poop"; 
      break;
    case "No lights":
      icon = "lightbulb-off"; 
      break;
    case "Dirty":
      icon = "delete-off"; 
      break;
    case "No shadow":
      icon = "sun-thermometer"; 
      break;
    default:
      icon = "alert-octagon";
      break;
  }

  return (
    <View style={styles.markerContainer}>{icon && <Icon name={icon} />}</View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
  },
});

export default MapItemMarker;
