import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  Button,
  CheckBox,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const genderOptions = ["Male", "Female"];

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
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      dropdownStyle={styles.pickerDropdown}
      buttonStyle={styles.pickerButton}
      textStyle={styles.pickerText}
    />
  );
};

const ModalTitle = ({ title }) => {
  return (
    <View style={modalStyles.modalTitleContainer}>
      <Text style={modalStyles.title}>{title}</Text>
    </View>
  );
};

const ModalSubmitButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={modalStyles.modalButton} onPress={onPress}>
      <Text style={modalStyles.modalButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const ModalCheckbox = ({ title, onPress }) => {
  return (
    <View style={checkboxStyle.checkboxContainer}>
      <BouncyCheckbox
        size={25}
        fillColor="red"
        unfillColor="#FFFFFF"
        text={title}
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        onPress={(isChecked) => {
          console.log(title, isChecked);
        }}
        textStyle={checkboxStyle.checkboxText}
      />
    </View>
  );
};

const ModalPreference = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        paddingLeft: 50,
      }}
    >
      <ModalCheckbox title="Clean" />
      <ModalCheckbox title="Security" />
      <ModalCheckbox title="Scenery" />
      <ModalCheckbox title="Speed" />
      <ModalCheckbox title="Accessiblity" />
    </View>
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
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          height: "60%",
        }}
      >
        <ModalTitle title="Set up your prefrences" />
        <ModalPreference />

        <ModalSubmitButton onPress={() => onClose()} title="Submit" />
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  modalButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 40,
  },
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  pickerDropdown: {
    width: "40%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "#EAEAEA",
    marginHorizontal: 10,
  },
  pickerButton: {
    width: "40%",
    height: 50,
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  pickerText: {
    color: "#333333",
    fontSize: 18,
  },
});

const checkboxStyle = StyleSheet.create({
  checkboxContainer: {
    paddingTop: 15,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  checkboxText: {
    textDecorationLine: "none",
  },
});
