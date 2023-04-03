import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import {
  BigStyledButton,
  StyledTitle,
} from "../components/AuthFormsComponents";
import { globalStyles } from "../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("Signing in with email:", email, "and password:", password);
    navigation.navigate("Home");
  };

  const handleForgotPassword = () => {
    // handle forgot password logic here
  };

  const handleSignUp = () => {
    navigation.navigate("Sign Up");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <StyledTitle title="Sign In" />
      <TextInput
        style={globalStyles.input}
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={(e) => {
          setEmail(e);
        }}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(e) => {
          setPassword(e);
        }}
      />
      <BigStyledButton callback={handleSignIn} text="Sign In" />
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "blue",
    fontSize: 14,
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpText: {
    color: "black",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default SignInScreen;
