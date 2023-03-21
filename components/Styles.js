import React from "react";
import { Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";

export const BigStyledButton = ({ text, callback }) => {
  return (
    <TouchableOpacity style={globalStyles.button} onPress={callback}>
      <Text style={globalStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  button: {
    backgroundColor: "blue",
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
