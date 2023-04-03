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
  const [loading, setLoading] = useState(false);
  const handleModalClose = async (prefrences) => {
    setLoading(true);
    setIsModalVisible(false);
    const user = {
      signUpData: signUpData,
      prefrences: prefrences,
    };
    //add user validation

    console.log(user);
    const res = await signUpUser(user);
    console.log(res);
    navigation.navigate("Home");
  };

  const handleSkip = () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyles.container}
    >
      <PrefrencesModal isVisible={isModalVisible} onClose={handleModalClose} />
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
