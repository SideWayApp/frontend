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
  SignInModal,
  StyledTitle,
} from "../components/AuthFormsComponents";
import { globalStyles } from "../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { login } from "../axios";
import { useSelector, useDispatch } from "react-redux";
import { setToken, getToken } from "../Redux/authenticationReducer/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    console.log("Signing in with email:", email, "and password:", password);
    const validate = validateEmailAndPassword();
    if (validate === null) {
      const data = {
        email: email,
        password: password,
      };
      const token = await login(data);
      if (token !== null) {
        console.log(token);
        dispatch(setToken(token));
        await AsyncStorage.setItem("token", token);
        setIsModalVisible(true);
        // navigation.navigate("Home");
      } else {
        console.log("wrong email or password");
      }
    } else {
      console.log(validate);
    }
  };

  const handleForgotPassword = () => {
    // handle forgot password logic here
  };

  const handleSignUp = () => {
    navigation.navigate("Sign Up");
  };

  const validateEmailAndPassword = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long ";
    }

    return null;
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleSkip = () => {
    setIsModalVisible(false);
    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <SignInModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        handleSkip={handleSkip}
      />
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
