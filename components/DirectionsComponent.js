import React, { useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getDirections } from "../axios";
import {
  Stack,
  TextInput,
  IconButton,
  Button,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const DirectionsComponent = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [preference, setPreference] = useState("fastest"); // Set default preference value

  const handleGetDirections = async () => {
    try {
      const directions = await getDirections(origin, destination, preference);
      console.log(directions);
      // Do something with the directions, e.g. render a map
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Stack spacing={0}>
        <TextInput
          label="Origin"
          variant="outlined"
          value={origin}
          onChangeText={setOrigin}
        />
        <TextInput
          label="Destination"
          variant="outlined"
          value={destination}
          onChangeText={setDestination}
        />
        {/* <Picker selectedValue={preference} onValueChange={setPreference}>
					<Picker.Item label="Clean" value="clean" />
					<Picker.Item label="Safe" value="safe" />
					<Picker.Item label="Scenery" value="scenery" />
					<Picker.Item label="Accessible" value="accessible" />
				</Picker> */}
        <Button
          style={{ backgroundColor: "green" }}
          title="Get Directions"
          onPress={handleGetDirections}
          trailing={(props) => <Icon name="send" {...props} />}
        />
      </Stack>
    </View>
  );
};

export default DirectionsComponent;
