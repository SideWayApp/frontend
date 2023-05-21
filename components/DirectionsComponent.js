import React, { useState, useRef } from "react"
import { View, Alert } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { getDirectionsOne, getWayPointsAndInstructions } from "../axios"
import {
	Stack,
	TextInput,
	IconButton,
	Button,
	ActivityIndicator,
} from "@react-native-material/core"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import { setOrigin, setDestination } from "../Redux/DirectionsStore/actions"

const DirectionsComponent = (props) => {
	const navigation = useNavigation()
	const { origin, destination } = useSelector((state) => state.directions)
	const user = useSelector((state) => state.auth.user)
	const [isLoading, setIsLoading] = useState(false)
	const dispatch = useDispatch()

const handleGetDirections = async () => {
		setIsLoading(true)
		try {
			if (origin === "Origin" || destination === "Destination") {
				console.log(origin, destination)
				console.log("Problem in origin or destination...")
				Alert.alert(
					"Origin or Destination are empty or invalid",
					"Please try again",
					[{ text: "OK" }],
					{ cancelable: false }
				)
				setIsLoading(false)
				return
			}
			const res = await getWayPointsAndInstructions(
				origin,
				destination,
				props.preference
			)
			props.setDuration(res.duration);
			props.setDistance(res.distance);
			props.setWayPoints(res.arr)
			props.setPolyline(res.points)
			props.setIsDirection(true)
			props.setIsGotDirection(true)
			setIsLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<View>
			<Stack spacing={0}>
				<View style={{ flexDirection: "row" }}>
					<View style={{ width: "91%" }}>
						<Button
							title={origin}
							variant="outlined"
							value={origin}
							onPress={() => {
								if (user) {
									navigation.navigate("Choose Point", { type: "Origin" })
								} else {
									Alert.alert(
										"Not logged in",
										"Sign in please",
										[
											{
												text: "Sign in",
												onPress: () => {
													navigation.navigate("Sign In")
												},
											},

											{ text: "OK" },
										],
										{ cancelable: false }
									)
								}
							}}
							uppercase={false}
							color="black"
						/>
						<Button
							title={destination}
							variant="outlined"
							value={destination}
							onPress={() => {
								if (user) {
									navigation.navigate("Choose Point", { type: "Destination" })
								} else {
									Alert.alert(
										"Not logged in",
										"Sign in please",
										[
											{
												text: "Cancel",
											},

											{ text: "OK" },
										],
										{ cancelable: false }
									)
								}
							}}
							uppercase={false}
							color="black"
						/>
					</View>
					<IconButton
						icon={(props) => <Icon name="swap-vertical" size={30} />}
						onPress={() => {
							dispatch(setOrigin(destination))
							dispatch(setDestination(origin))
						}}
						style={{ alignSelf: "center", width: 30, height: 30 }}
					></IconButton>
				</View>

				<Button
					style={{ backgroundColor: "green" }}
					title="Get Directions"
					onPress={handleGetDirections}
					trailing={(props) => <Icon name="send" {...props} />}
					loading={isLoading}
				>
					{isLoading ? <ActivityIndicator /> : null}
				</Button>
			</Stack>
		</View>
	)
}

export default DirectionsComponent
