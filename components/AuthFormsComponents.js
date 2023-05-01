import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  Alert,
  TextInput,
  SafeAreaView,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import SelectDropdown from "react-native-select-dropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

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
        size={35}
        fillColor="red"
        unfillColor="#FFFFFF"
        text={title}
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        onPress={(isChecked) => {
          onPress(isChecked, title);
        }}
        textStyle={checkboxStyle.checkboxText}
      />
    </View>
  );
};

const Prefrences = ({ setPreference }) => {
  const onPress = (isChecked, title) => {
    setPreference((oldData) => {
      // Create a new object to update the preferences
      const newPreferences = { ...oldData };
      // Update the appropriate field based on the title
      switch (title) {
        case "Clean":
          newPreferences.clean = isChecked;
          break;
        case "Security":
          newPreferences.security = isChecked;
          break;
        case "Scenery":
          newPreferences.scenery = isChecked;
          break;

        case "Accessibility":
          newPreferences.accessibility = isChecked;
          break;
        case "Speed":
          newPreferences.speed = isChecked;
          break;
        default:
          break;
      }
      // Return the updated preferences
      return newPreferences;
    });
  };
  return (
    <View
      style={{
        flexDirection: "column",
        paddingLeft: 50,
      }}
    >
      <ModalCheckbox onPress={onPress} title="Clean" />
      <ModalCheckbox onPress={onPress} title="Security" />
      <ModalCheckbox onPress={onPress} title="Scenery" />
      <ModalCheckbox onPress={onPress} title="Accessiblity" />
      <ModalCheckbox onPress={onPress} title="Speed" />
    </View>
  );
};

export const PrefrencesModal = ({ isVisible, onClose, handleSkip }) => {
  const navigation = useNavigation();
  const [prefrences, setPreference] = useState({
    accessibility: false,
    clean: false,
    scenery: false,
    security: false,
    speed: false,
  });
  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <ModalTitle title="Set up your prefrences" />
      <Prefrences setPreference={setPreference} />
      <ModalSubmitButton
        onPress={() => {
          onClose(prefrences);
          navigation.navigate("Home", { openPrefrencesModal: false });
        }}
        title="Submit"
      />
      <TouchableOpacity
        style={modalStyles.closeButton}
        onPress={() => {
          handleSkip();
        }}
      >
        <Text style={modalStyles.skipText}>Skip</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export const ProfileModal = ({ isVisible, onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {user && (
        <>
          <ModalTitle title={`Hello ${user.signUpData.name}`} />
          <BorderLineButton
            title="Update your prefrencess"
            onPress={() => {
              console.log("Update your prefrencess pressed");
              navigation.navigate("Home", { openProfileModal: false });
              navigation.navigate("Home", { openPrefrencesModal: true });
            }}
          />
          <BorderLineButton
            title="Edit your information"
            onPress={() => {
              console.log("Edit your information pressed");
              navigation.navigate("Home", { openProfileModal: false });
              navigation.navigate("Home", { openEditProfileModal: true });
            }}
          />

          <TouchableOpacity
            style={modalStyles.closeButton}
            onPress={() => {
              onClose();
              navigation.navigate("Home", { openProfileModal: false });
            }}
          >
            <Text style={modalStyles.skipText}>Close</Text>
          </TouchableOpacity>
        </>
      )}
    </Modal>
  );
};

export const EditProfileModal = ({ isVisible, onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const [number, onChangeNumber] = React.useState("");

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {user && (
        <>
          <ModalTitle title={`Edit Profile`} />
          <SafeAreaView>
            <TextInput
              style={modalStyles.input}
              value={user.signUpData.name}
              placeholder="Full Name"
            />
            <TextInput
              style={modalStyles.input}
              value={""}
              placeholder="Email"
            />
            <TextInput
              style={modalStyles.input}
              value={""}
              placeholder="Password"
            />
          </SafeAreaView>
          <TouchableOpacity
            style={modalStyles.closeButton}
            onPress={() => {
              onClose();
              navigation.navigate("Home", { openProfileModal: false });
            }}
          >
            <Text style={modalStyles.skipText}>Close</Text>
          </TouchableOpacity>
        </>
      )}
    </Modal>
  );
};

const BorderLineButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginVertical: 8,
        marginHorizontal: 15,
        height: 50,
      }}
      onPress={onPress}
    >
      <Text style={{ textAlign: "center", fontSize: 20 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export const StyledAlert = ({ error, setError }) => {
  Alert.alert(
    "Error",
    error,
    [{ text: "OK", onPress: () => setError(false) }],
    { cancelable: false }
  );
  return null;
};

const modalStyles = StyleSheet.create({
  closeButton: {
    marginTop: "90%",
  },
  skipText: {
    textAlign: "center",
    color: "black",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  modalButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
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
    marginBottom: "15%",
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
