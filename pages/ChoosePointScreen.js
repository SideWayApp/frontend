import { React, useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import {
	TextInput,
	Stack,
	Button,
	ListItem,
	Text,
	ActivityIndicator,
} from "@react-native-material/core"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from "react-redux"
import { setOrigin, setDestination } from "../Redux/DirectionsStore/actions"
import * as Location from "expo-location"
import { getAddressFromLatLng, addRecent, getUserData } from "../axios"
import AutoCompleteComponent from "../components/AutoCompleteComponent"
import ListDirectionsComponent from "../components/ListDirectionsComponent"
import AsyncStorage from "@react-native-async-storage/async-storage"

function ChoosePointScreen({ route, navigation }) {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.token)
	const user = useSelector((state) => state.auth.user)
	const [location, setLocation] = useState("")
	const [inputValue, setInputValue] = useState("")
	const [isBtnSubmitDisabled, setIsBtnSubmitDisabled] = useState(true)
	const [isLoadingLocation, setIsLoadingLocation] = useState(false)
	const [list, setList] = useState([])

	useEffect(() => {
		getLocation()
	}, [location])

	const fetchAsyncToken = async () => {
		const asyncToken = await AsyncStorage.getItem("token")
		if (asyncToken !== null) {
			const u = await getUserData(asyncToken)
			dispatch(setUser(u))
			setList(user.recents)
			console.log(list)
		}
	}

	function OriginOrDestination(value) {
		const data = {
			recent: value,
		}
		if (route.params.type === "Origin") {
			dispatch(setOrigin(value))
			addRecent(data, token)
			fetchAsyncToken()
		}
		if (route.params.type === "Destination") {
			dispatch(setDestination(value))
			addRecent(data, token)
			fetchAsyncToken()
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
		setIsLoadingLocation(true)
		try {
			const getAdd = await getAddressFromLatLng(
				location.coords.latitude,
				location.coords.longitude
			)
			OriginOrDestination(getAdd)
			const data = {
				recent: getAdd,
			}
			addRecent(data, token)
			fetchAsyncToken()
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
							loading={isLoadingLocation}
							onPress={getAddress}
						>
							{isLoadingLocation ? <ActivityIndicator /> : null}
						</Button>
					</View>
					<View style={styles.section}>
						<ListDirectionsComponent
							title="Recent"
							list={list}
						></ListDirectionsComponent>

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
