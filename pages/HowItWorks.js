import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HowItWorks = ({ onPress }) => {
  const navigation = useNavigation();

  const onContinue = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>How Our App Works</Text>
      <Text style={styles.subtitle}>Step 1: Choose Your Preferences</Text>
      <Text style={styles.description}>
        Our app allows you to choose your preferences for your route. You can
        select from four options: accessibility, clean, scenery, and security.
        Depending on your selection, our app will generate the best route for
        you, and will display relevant items on the map based on your
        preferences. For example, if you select "security", our app will display
        the locations of nearby security cameras and police stations on the map.
      </Text>
      <Text style={styles.subtitle}>Step 2: Enter Your Destination</Text>
      <Text style={styles.description}>
        Once you have selected your preferences, you can enter your destination
        in our app. We have data on all the streets in Tel Aviv, so you can
        trust that our app will generate the most efficient route for you, while
        also taking into account your preferences for items to display on the
        map.
      </Text>
      <Text style={styles.subtitle}>Step 3: Follow the Route</Text>
      <Text style={styles.description}>
        Once your route has been generated, you can follow the directions
        provided by our app. Our app will provide you with turn-by-turn
        directions and notify you of any hazards or obstructions along the way.
        Additionally, our app will display relevant items on the map based on
        your preferences, so you can see nearby light posts, defibrillators, and
        other relevant items as you navigate to your destination.
      </Text>
      <Text style={styles.subtitle}>Step 4: Enjoy Your Journey</Text>
      <Text style={styles.description}>
        Our app not only helps you reach your destination, but also ensures that
        you have an enjoyable journey. You can trust that our app will take you
        on the best route, based on your preferences and the items you want
        displayed on the map, so you can sit back, relax, and enjoy the ride.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HowItWorks;
