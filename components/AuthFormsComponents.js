import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  Pressable,
  Button,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const genderOptions = ["Male", "Female", "Preffered Not to Say"];

const ageOptions = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];

export const BigStyledButton = ({ text, callback }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={callback}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const StyledTitle = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

export const PickerRow = ({ setAge, setGender }) => {
  return (
    <View style={styles.pickerRow}>
      <StyledPicker
        data={genderOptions}
        title="Select Gender"
        callback={setGender}
      />
      <StyledPicker data={ageOptions} title="Select Age" callback={setAge} />
    </View>
  );
};

const StyledPicker = ({ data, title, callback }) => {
  return (
    <SelectDropdown
      defaultButtonText={title}
      data={data}
      onSelect={(selectedItem, index) => {
        callback(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
    />
  );
};

export const SignUpdModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Button onPress={() => onClose()} title="Close" />
          <Text>Modal</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  pickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: { marginBottom: 10 },
});
