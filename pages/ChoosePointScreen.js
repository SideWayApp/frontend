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

function ChoosePointScreen({ route, navigation }) {
	const dispatch = useDispatch()
	const [location, setLocation] = useState("")
	const [inputValue, setInputValue] = useState("")
	const [filteredSuggestions, setFilteredSuggestions] = useState([])
	const [showSuggestions, setShowSuggestions] = useState(false)

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

	const onChange = async (inputValue) => {
		if (inputValue === "") {
			setInputValue("")
			return
		} else {
			try {
				setInputValue(inputValue)
				const filteredSuggestions = await getStreetsStartingWith(inputValue)
				setFilteredSuggestions(filteredSuggestions)
				setShowSuggestions(true)
			} catch (error) {
				console.error(error)
				setFilteredSuggestions([])
				setShowSuggestions(false)
			}
		}
	}

	const onClick = (suggestion) => {
		setInputValue(suggestion)
		setFilteredSuggestions([])
		setShowSuggestions(false)
	}
	const renderSuggestions = () => {
		if (showSuggestions && inputValue) {
			if (filteredSuggestions.length) {
				return (
					<FlatList
						data={filteredSuggestions}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => onClick(item)}>
								<Text
									style={styles.suggestion}
									onPress={() => OriginOrDestination(item)}
								>
									{item}
								</Text>
							</TouchableOpacity>
						)}
						keyExtractor={(item) => item}
					/>
				)
			} else {
				return <Text style={styles.noSuggestions}>No suggestions available.</Text>
			}
		}
		return null
	}

	return (
		<View style={styles.container}>
			<Stack spacing={0}>
				<View style={styles.column}>
					<View style={styles.view}>
						<TextInput
							label={route.params.type}
							style={styles.input}
							onChangeText={onChange}
							value={inputValue}
							placeholder="Search"
							variant="outlined"
							leading={(props) => <Icon name="magnify" {...props} />}
							trailing={(props) => (
								<Icon
									name="close"
									onPress={() => {
										if (route.params.type === "Origin") {
											dispatch(setOrigin(""))
											setInputValue("")
										}
										if (route.params.type === "Destination") {
											dispatch(setDestination(""))
											setInputValue("")
										}
									}}
									{...props}
								/>
							)}
						/>
						{renderSuggestions()}

						<Button
							title="Your current location"
							trailing={(props) => <Icon name="map-marker" {...props} />}
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
	suggestion: {
		padding: 10,
		backgroundColor: "#eee",
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	noSuggestions: {
		padding: 10,
	},
})
export default ChoosePointScreen
