import React from "react";
import { Marker, Callout } from "react-native-maps";
import { View, StyleSheet, Text } from "react-native";

const MapClickedMarker = ({
  handleNavigation,
  handleOnLayout,
  coordinates,
  markerRef,
  clickedAddress,
}) => {
  return (
    <Marker
      coordinate={coordinates}
      pinColor="#F59F0C"
      ref={markerRef}
      onLayout={handleOnLayout}
    >
      <Callout tooltip onPress={handleNavigation}>
        <View style={styles.calloutContainer}>
        <Text style={styles.calloutQuestion}>Navigate here</Text>
          <Text style={styles.calloutAdress}>{clickedAddress}</Text>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  markerContainer: {
    borderColor: "#000",
    padding: 0,
    borderRadius: 100,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1,
    borderRadius: 100,
    backgroundColor: "lightyellow",
  },
  iconContainer: {
    justifyContent: "center",
    width: 30,
    height: 30,
    bottom: 3,
    alignSelf: "center",
    alignItems: "center",
  },
  button: {
    zIndex: 999,
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
  },
  navigationButton: {
    zIndex: 999,
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  calloutContainer: {
    backgroundColor: "gray",
    borderRadius: 5,
    width: 150,
  },
  calloutQuestion: {
    color:"white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2.5,
    textAlign: "center",
  },
  calloutAdress: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: "center",
  },
  calloutDescription: {
    fontSize: 14,
  },
});

export default MapClickedMarker;
