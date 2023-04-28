import { React, useState, useEffect } from "react"
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import {
	Stack,
	Button,
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
import { setUser } from "../Redux/authenticationReducer/authActions"

function ChoosePointScreen({ route, navigation }) {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.auth.user)
	const token = useSelector((state) => state.auth.token)
	const [location, setLocation] = useState(null)
	const [inputValue, setInputValue] = useState("")
	const [isBtnSubmitDisabled, setIsBtnSubmitDisabled] = useState(true)
	const [isLoadingLocation, setIsLoadingLocation] = useState(false)
	const [list, setList] = useState([])

	useEffect(() => {
		if (location) {
			getAddress()
		}
	}, [location])

	useEffect(() => {
		setList(user.recents)
	}, [user])

	const fetchAsyncToken = async () => {
		const asyncToken = await AsyncStorage.getItem("token")
		if (asyncToken !== null) {
			const u = await getUserData(asyncToken)
			console.log(u, user)
			dispatch(setUser(u))
			setList(user.recents)
		}
	}

	function OriginOrDestination(value) {
		if (route.params.type === "Origin") {
			dispatch(setOrigin(value))
			addToArray(value)
		}
		if (route.params.type === "Destination") {
			dispatch(setDestination(value))
			addToArray(value)
		}
		navigation.goBack()
	}
	const getLocation = async () => {
		setIsLoadingLocation(true)
		try {
			const currentLocation = await Location.getCurrentPositionAsync({})
			setLocation(currentLocation)
		} catch (error) {
			console.error(error)
		}
	}

	const getAddress = async () => {
		try {
			if (location !== null) {
				const getAdd = await getAddressFromLatLng(
					location.coords.latitude,
					location.coords.longitude
				)
				OriginOrDestination(getAdd)
				navigation.navigate("Home")
			}
		} catch (error) {
			console.error("Could not found", error)
		}
	}

	function addToArray(value) {
		const data = {
			recent: value,
		}

		if (!list.includes(data.recent) && list.length < 5) {
			addRecent(data, token)
			setTimeout(() => {
				fetchAsyncToken()
			}, 500)
		}
		if (list.length > 5) {
			const newList = [...list]
			newList.shift()
			newList.push(newItem)
			setList(newList)
		}
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={styles.container}>
					<ScrollView></ScrollView>
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
									onPress={getLocation}
								>
									{isLoadingLocation ? <ActivityIndicator /> : null}
								</Button>
							</View>
							<View style={styles.section}>
								<ListDirectionsComponent
									title="Recent"
									list={list}
									iconName={"star-plus-outline"}
								></ListDirectionsComponent>
							</View>
							<View style={styles.section}>
								<ListDirectionsComponent
									title="Favorites"
									list={[]}
									iconName={""}
								></ListDirectionsComponent>
							</View>
						</View>
					</Stack>
				</View>
			</ScrollView>
		</SafeAreaView>
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
