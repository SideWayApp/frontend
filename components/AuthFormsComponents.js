import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  Alert,
  TextInput,
  SafeAreaView,
  Pressable,
} from "react-native";
import { updateUserPrefrences } from "../axios";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import SelectDropdown from "react-native-select-dropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../Styles/GlobalStyles";

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

export const UpdatePickerRow = ({ setAge, setGender, age, gender }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <View style={styles.pickerRow}>
      <StyledPicker
        data={genderOptions}
        title={user.signUpData.gender}
        callback={setGender}
      />
      <StyledPicker
        data={ageOptions}
        title={user.signUpData.age}
        callback={setAge}
      />
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

const ModalCheckbox = ({ title, onPress, isChecked = false }) => {
  return (
    <View style={checkboxStyle.checkboxContainer}>
      <BouncyCheckbox
        size={35}
        fillColor="red"
        unfillColor="#FFFFFF"
        text={title}
        iconStyle={{ borderColor: "red" }}
        innerIconStyle={{ borderWidth: 2 }}
        isChecked={isChecked || false}
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

const UpdatePrefrences = ({ setPreference, preferences }) => {
  // useEffect(() => {
  //   console.log(preferences);
  // }, [preferences]);
  const onPress = (isChecked, title) => {
    setPreference((oldData) => {
      console.log("old data: ", oldData);
      console.log("title ", title);
      // Create a new object to update the preferences
      const newPreferences = { ...oldData };
      // Update the appropriate field based on the title
      switch (title) {
        case "Accessibility":
          newPreferences.accessibility = isChecked;
          break;
        case "Clean":
          newPreferences.clean = isChecked;
          break;
        case "Security":
          newPreferences.security = isChecked;
          break;
        case "Scenery":
          newPreferences.scenery = isChecked;
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
      {preferences && (
        <>
          <ModalCheckbox
            onPress={onPress}
            title="Clean"
            isChecked={preferences.clean}
          />
          <ModalCheckbox
            onPress={onPress}
            title="Security"
            isChecked={preferences.security}
          />
          <ModalCheckbox
            onPress={onPress}
            title="Scenery"
            isChecked={preferences.scenery}
          />
          <ModalCheckbox
            onPress={onPress}
            title="Accessibility"
            isChecked={preferences.accessibility}
          />
          <ModalCheckbox
            onPress={onPress}
            title="Speed"
            isChecked={preferences.speed}
          />
        </>
      )}
    </View>
  );
};

export const UpdatePrefrencesModal = ({ isVisible, onClose, handleSkip }) => {
  const user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const [prefrences, setPreference] = useState({
    accessibility: false,
    clean: false,
    scenery: false,
    security: false,
    speed: false,
  });

  useEffect(() => {
    if (user) {
      setPreference({
        accessibility: user.preferences.accessibility,
        clean: user.preferences.clean,
        scenery: user.preferences.scenery,
        security: user.preferences.security,
        speed: user.preferences.speed,
      });
    }
  }, [user]);

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <ModalTitle title="Set up your prefrences" />
      <UpdatePrefrences
        setPreference={setPreference}
        preferences={prefrences}
      />
      <ModalSubmitButton
        onPress={async () => {
          onClose(prefrences);
          await updateUserPrefrences({ preferences: prefrences });
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
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user.signUpData.name);
    }
  }, [user]);

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
          <ModalTitle title={`Hello ${userName}`} />
          <BorderLineButton
            title="Update your prefrencess"
            onPress={() => {
              console.log(user.preferences);
              navigation.navigate("Home", { openProfileModal: false });
              navigation.navigate("Home", { openUpdatePrefrencesModal: true });
            }}
          />
          <BorderLineButton
            title="Edit your information"
            onPress={() => {
              console.log("Edit your information pressed");
              console.log(user.signUpData.name);
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
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [userName, setUserName] = useState("");
  const handleUpdateUserName = (inputText) => {
    setUserName(inputText);
  };

  useEffect(() => {
    if (user) {
      setUserName(user.signUpData.name);
    }
  }, [user]);

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
          <SafeAreaView style={modalStyles.centeredView}>
            <TextInput
              type="text"
              style={modalStyles.input}
              placeholder="Full Name"
              returnKeyType="next"
              value={userName}
              onChangeText={handleUpdateUserName}
            />
            <UpdatePickerRow setAge={setAge} setGender={setGender} />
            <Pressable style={modalStyles.button}>
              <Text style={modalStyles.buttonText}>Save</Text>
            </Pressable>
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => {
                onClose();
                navigation.navigate("Home", { openProfileModal: false });
              }}
            >
              <Text style={modalStyles.skipText}>Close</Text>
            </TouchableOpacity>
          </SafeAreaView>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
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
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    top: "15%",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
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
