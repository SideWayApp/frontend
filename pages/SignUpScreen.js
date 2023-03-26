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
  SignUpdModal,
} from "../components/AuthFormsComponents";
import { globalStyles } from "../Styles/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const handleSignUp = () => {
    console.log(signUpData);
    console.log(gender);
    console.log(age);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <SignUpdModal isVisible={isModalVisible} onClose={handleModalClose} />
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
        animating="false"
        style={{ marginTop: 20 }}
        size="large"
      />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
