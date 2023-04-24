import { React, useState, useEffect } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import {
	TextInput,
	Stack,
	Button,
	ListItem,
	Text,
} from "@react-native-material/core"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { useDispatch } from "react-redux"
import { setOrigin, setDestination } from "../Redux/DirectionsStore/actions"
import * as Location from "expo-location"
import { getAddressFromLatLng, getStreetsStartingWith } from "../axios"
import AutoCompleteComponent from "../components/AutoCompleteComponent"

function ChoosePointScreen({ route, navigation }) {
	const dispatch = useDispatch()
	const [location, setLocation] = useState("")
	const [inputValue, setInputValue] = useState("")
	const [isBtnSubmitDisabled, setIsBtnSubmitDisabled] = useState(true)

	useEffect(() => {
		getLocation()
	}, [location])

	function OriginOrDestination(value) {
		if (route.params.type === "Origin") {
			dispatch(setOrigin(value))
		}
		if (route.params.type === "Destination") {
			dispatch(setDestination(value))
		}
		navigation.goBack()
	}
	const getLocation = async () => {
		try {
			let currentLocation = await Location.getCurrentPositionAsync({})
			setLocation(currentLocation)
		} catch (error) {
			console.error(error)
		}
	}

	const getAddress = async () => {
		try {
			const getAdd = await getAddressFromLatLng(
				location.coords.latitude,
				location.coords.longitude
			)
			OriginOrDestination(getAdd)
			navigation.navigate("Home")
		} catch (error) {
			console.error("Could not found", error)
		}
	}

	return (
		<View style={styles.container}>
			<Stack spacing={0}>
				<View style={styles.column}>
					<View style={styles.view}>
						<AutoCompleteComponent
							type={route.params.type}
							styleInput={styles.input}
							OriginOrDestination={OriginOrDestination}
							setIsBtnSubmitDisabled={setIsBtnSubmitDisabled}
							inputValue={inputValue}
							setInputValue={setInputValue}
						></AutoCompleteComponent>
						<Button
							title="submit"
							trailing={(props) => <Icon name="check" {...props} />}
							disabled={isBtnSubmitDisabled}
							onPress={() => OriginOrDestination(inputValue)}
						/>

						<Button
							title="Your current location"
							trailing={(props) => <Icon name="map-marker" {...props} />}
							onPress={getAddress}
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
