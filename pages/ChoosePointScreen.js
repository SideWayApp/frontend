import { React, useState, useEffect } from "react"
import DirectionsComponent from "../components/DirectionsComponent"
import { View, StyleSheet } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import {
	TextInput,
	Stack,
	Button,
	ListItem,
	Text,
} from "@react-native-material/core"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { useSelector, useDispatch } from "react-redux"
import { setOrigin, setDestination } from "../Redux/DirectionsStore/actions"
import * as Location from "expo-location"
import { getAddressFromLatLng } from "../axios"

function OriginOrDestination(value) {
	if (value === "Origin") {
		dispatch(setOrigin(value))
	}
	if (value === "Destination") {
		dispatch(setDestination(value))
	}
}

function ChoosePointScreen({ route, navigation }) {
	const dispatch = useDispatch()
	const { origin, destination } = useSelector((state) => state)
	const [location, setLocation] = useState("")
	const handleSaveAddress = (event) => {
		OriginOrDestination(event.nativeEvent.text)
		navigation.goBack()
	}

	useEffect(() => {
		getLocation()
	}, [])

	const getLocation = async () => {
		try {
			let currentLocation = await Location.getCurrentPositionAsync({})
			setLocation(currentLocation)
			// console.log(location)
		} catch (error) {
			console.error(error)
		}
	}

	const getAddress = async () => {
		// console.log(location.coords.altitude, location.coords.longitude)
		try {
			const getAdd = await getAddressFromLatLng(
				location.coords.latitude,
				location.coords.longitude
			)
			console.log(getAdd)
			OriginOrDestination(getAdd)
		} catch (error) {
			console.error("Could not found", error)
		}
	}

	return (
		<View style={styles.container}>
			<Stack spacing={0}>
				<View style={styles.column}>
					<View style={styles.view}>
						<TextInput
							label={route.params.type}
							value={route.params.type === "Origin" ? origin : destination}
							onChangeText={(text) => {
								if (route.params.type === "Origin") {
									dispatch(setOrigin(text))
								}
								if (route.params.type === "Destination") {
									dispatch(setDestination(text))
								}
							}}
							onEndEditing={handleSaveAddress}
							variant="outlined"
							leading={(props) => <Icon name="magnify" {...props} />}
						/>
						<Button
							title="Your current location"
							trailing={(props) => <Icon name="" {...props} />}
							onPress={getAddress}
						/>
						<Button
							title="Choose on map"
							trailing={(props) => <Icon name="map" {...props} />}
						/>
					</View>
					<View style={styles.section}>
						<Text style={{ marginBottom: 10 }}>Recent</Text>
						<ListItem
							title="List Item"
							trailing={(props) => <Icon name="star" {...props} />}
						/>
						<ListItem
							title="List Item"
							trailing={(props) => <Icon name="star" {...props} />}
						/>
						<ListItem
							title="List Item"
							trailing={(props) => <Icon name="star" {...props} />}
						/>
					</View>
				</View>
			</Stack>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {},
	column: {
		flexDirection: "column",
		alignSelf: "center",
		width: "99%",
	},
	section: {
		alignSelf: "center",
		width: "99%",
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 5,
		padding: 10,
		marginTop: 10,
	},
	view: {
		gap: 10,
	},
})
export default ChoosePointScreen
