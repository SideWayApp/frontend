import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

const InstructionsComponent = ({ instructions }) => {
  const [displayedInstructions, setDisplayedInstructions] = useState("");

  const getNextInstruction = (currentLatitude, currentLongitude) => {
    for (let i = 0; i < instructions.length; i++) {
      const { latitude, longitude, instruction } = instructions[i];
      const distance = getDistance(
        currentLatitude,
        currentLongitude,
        latitude,
        longitude
      );
      if (distance < 10) {
        return instructions[i + 1]
          ? instructions[i + 1].instruction
          : "You have arrived at your destination.";
      }
    }
    return null;
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000; // Distance in meters
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  useEffect(() => {
    setDisplayedInstructions(instructions[0].instruction);
  }, [instructions]);

  useEffect(() => {
    const asyncLocation = async () => {
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          // do something with the latitude and longitude
          console.log("location is " + latitude + " and " + longitude);
          const inst = getNextInstruction(latitude, longitude);
          if (inst) {
            console.log("instruction is " + inst);
            setDisplayedInstructions(inst);
          }
        }
      );
    };
    asyncLocation();
  }, []);
  return (
    <View style={styles.container}>
      {instructions.length > 0 && (
        <Text style={styles.text}>{displayedInstructions}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "10%",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default InstructionsComponent;
