import React from "react";
import { View, StyleSheet } from "react-native";
import AppBarComponent from "../components/AppBarComponent";
import DirectionsScreen from "../components/DirectionsScreen";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <DirectionsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
