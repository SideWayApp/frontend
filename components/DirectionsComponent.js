import React, { useState,useRef } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getDirectionsOne,getWayPoints} from "../axios";
import {
  Stack,
  TextInput,
  IconButton,
  Button,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const DirectionsComponent = (props) => {
  const handleGetDirections = async () => {
    try {
      const directions = await getDirectionsOne(props.origin, props.destination, props.preference);
      const wayPointArr = await getWayPoints(props.origin,props.destination,props.preference);
      props.setWayPointsArr(wayPointArr)
      console.log(directions[0])
      props.setIsDirection(true);
      const startLocation = directions[0].start_location;
      const endLocation = directions[1].end_location;
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
          value={props.origin}
          onChangeText={props.setOrigin}
        />
        <TextInput
          label="Destination"
          variant="outlined"
          value={props.destination}
          onChangeText={props.setDestination}
        />
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
