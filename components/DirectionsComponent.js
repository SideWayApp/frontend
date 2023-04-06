import React, { useState, useRef } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { getDirectionsOne, getWayPoints } from "../axios"
import {
	Stack,
	TextInput,
	IconButton,
	Button,
} from "@react-native-material/core"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import { setOrigin, setDestination } from "../Redux/DirectionsStore/actions"

const DirectionsComponent = (props) => {
	const navigation = useNavigation()
	const { origin, destination } = useSelector((state) => state)
	const dispatch = useDispatch()

	const handleGetDirections = async () => {
		try {
			const directions = await getDirectionsOne(
				origin,
				destination,
				props.preference
			)
			const wayPointArr = await getWayPoints(origin, destination, props.preference)
			props.setWayPointsArr(wayPointArr)
			props.setIsDirection(true)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<View>
			<Stack spacing={0}>
				<View style={{ flexDirection: "row" }}>
					<View style={{ width: "93%" }}>
						<Button
							title={origin}
							variant="outlined"
							value={origin}
							onPress={() => navigation.navigate("Choose Point", { type: "Origin" })}
							uppercase={false}
							color="black"
						/>
						<Button
							title={destination}
							variant="outlined"
							value={destination}
							onPress={() =>
								navigation.navigate("Choose Point", { type: "Destination" })
							}
							uppercase={false}
							color="black"
						/>
					</View>
					<Image
						source={require("../images/swap.png")}
						style={{ width: "5%", height: "20%", alignSelf: "center" }}
					></Image>
				</View>
				<Button
					style={{ backgroundColor: "green" }}
					title="Get Directions"
					onPress={handleGetDirections}
					trailing={(props) => <Icon name="send" {...props} />}
				/>
			</Stack>
		</View>
	)
}

export default DirectionsComponent
