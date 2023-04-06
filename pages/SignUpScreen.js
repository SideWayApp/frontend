import React, { useState } from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";

import {
  BigStyledButton,
  StyledTitle,
  PickerRow,
  PrefrencesModal,
  StyledAlert,
} from "../components/AuthFormsComponents";
import { globalStyles } from "../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { signUpUser } from "../axios";
const SignUpScreen = () => {
  const navigation = useNavigation();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    gender: "",
    age: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSignUp = () => {
    setSignUpData((prev) => ({ ...prev, gender: gender, age: age }));
    const validation = validateSignUpData();
    if (validation === null) {
      setIsModalVisible(true);
    } else {
      console.log(validation);
      setError(true);
      setErrorMessage(validation);
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  const handleModalClose = async (preferences) => {
    setLoading(true);
    setIsModalVisible(false);

    const user = {
      email: signUpData.email,
      password: signUpData.password,
      signUpData: {
        name: signUpData.name,
        gender: signUpData.gender,
        age: signUpData.age,
      },
      preferences: preferences,
    };
    const res = await signUpUser(user);
    setLoading(false);

    navigation.navigate("Home");
  };

  const handleSkip = async () => {
    const user = {
      email: signUpData.email,
      password: signUpData.password,
      signUpData: {
        name: signUpData.name,
        gender: signUpData.gender,
        age: signUpData.age,
      },
      preferences: {},
    };

    const res = await signUpUser(user);
    navigation.navigate("Home");
  };

  const validateSignUpData = () => {
    const { name, email, password, rePassword, gender, age } = signUpData;

    if (!name) {
      return "Name is required.";
    }

    if (!email) {
      return "Email is required.";
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email.";
    }

    if (!password) {
      return "Password is required.";
    }

    if (password.length < 6) {
      return "Password should be at least 8 characters.";
    }

    if (!rePassword) {
      return "Please confirm your password.";
    }

    if (password !== rePassword) {
      return "Passwords do not match.";
    }

    if (!gender) {
      return "Gender is required.";
    }

    if (!age) {
      return "Age is required.";
    }

    return null;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <PrefrencesModal
        isVisible={isModalVisible}
        onClose={handleModalClose}
        handleSkip={handleSkip}
      />
      {error && <StyledAlert error={errorMessage} setError={setError} />}
      <StyledTitle title="Sign Up" />
      <TextInput
        style={globalStyles.input}
        placeholder="Full Name"
        value={signUpData.name}
        returnKeyType="next"
        onChangeText={(e) => {
          setSignUpData((prevSignUpData) => ({ ...prevSignUpData, name: e }));
        }}
      />
      <TextInput
        style={globalStyles.input}
        keyboardType="email-address"
        placeholder="Email"
        value={signUpData.email}
        onChangeText={(e) => {
          setSignUpData((prevSignUpData) => ({ ...prevSignUpData, email: e }));
        }}
      />
      <PickerRow setAge={setAge} setGender={setGender} />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        secureTextEntry
        value={signUpData.password}
        onChangeText={(e) => {
          setSignUpData((prevSignUpData) => ({
            ...prevSignUpData,
            password: e,
          }));
        }}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Re-Password"
        secureTextEntry
        value={signUpData.rePassword}
        onChangeText={(e) => {
          setSignUpData((prevSignUpData) => ({
            ...prevSignUpData,
            rePassword: e,
          }));
        }}
      />
      <BigStyledButton callback={handleSignUp} text="Sign Up" />

      <ActivityIndicator
        animating={loading}
        style={{ marginTop: 20 }}
        size="large"
      />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
