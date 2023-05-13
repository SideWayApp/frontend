import React from "react";
import { Marker, Callout } from "react-native-maps";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

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
      <Callout onPress={handleNavigation}>
        <View>
          <Text>{`${coordinates.latitude.toFixed(
            6
          )}, ${coordinates.longitude.toFixed(6)}`}</Text>
          <Text>{clickedAddress}</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Navigation to here</Text>
          </View>
        </TouchableOpacity>
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
});

export default MapClickedMarker;
