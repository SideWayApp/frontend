import { React, useState, useEffect } from "react"
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native"
import { Button, ActivityIndicator } from "@react-native-material/core"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from "react-redux"
import { setOrigin, setDestination } from "../Redux/DirectionsStore/actions"
import * as Location from "expo-location"
import {
	getAddressFromLatLng,
	addRecent,
	getUserData,
	addFavorite,
	deleteRecent,
	deleteFavorite,
} from "../axios"
import AutoCompleteComponent from "../components/AutoCompleteComponent"
import ListDirectionsComponent from "../components/ListDirectionsComponent"
import { setUser } from "../Redux/authenticationReducer/authActions"

function ChoosePointScreen({ route, navigation }) {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.auth.user)
	const token = useSelector((state) => state.auth.token)
	const [location, setLocation] = useState(null)
	const [inputValue, setInputValue] = useState("")
	const [isBtnSubmitDisabled, setIsBtnSubmitDisabled] = useState(true)
	const [isLoadingLocation, setIsLoadingLocation] = useState(false)
	const [listRecents, setListRecents] = useState([])
	const [listFavorites, setListFavorites] = useState([])

	useEffect(() => {
		if (location) {
			getAddress()
		}
	}, [location])

	useEffect(() => {
		if (user) {
			const tempRec = [...user.recents]
			setListRecents(tempRec)
			const tempFav = [...user.favorites]
			setListFavorites(tempFav)
		}
	}, [user])

	const fetchAsyncToken = async () => {
		if (token) {
			const u = await getUserData(token)
			dispatch(setUser(u))
		}
	}

	function OriginOrDestination(value) {
		if (route.params.type === "Origin") {
			dispatch(setOrigin(value))
			addToRecArray(value)
		}
		if (route.params.type === "Destination") {
			dispatch(setDestination(value))
			addToRecArray(value)
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

	async function addToRecArray(value) {
		const data = {
			recent: value,
		}
		if (listRecents.includes(data.recent)) {
			return
		}
		if (!listRecents.includes(data.recent) && user.recents.length < 5) {
			await addRecent(data, token)
			await fetchAsyncToken()
		}
		if (listRecents.length >= 5) {
			await deleteRecent(listRecents[0], token)
			await addRecent(data, token)
			await fetchAsyncToken()
		}
	}

	async function addToFavArray(value) {
		const data = {
			favorite: value,
		}
		if (!listFavorites.includes(data.favorite) && user.favorites.length < 5) {
			await addFavorite(data, token)
			await fetchAsyncToken()
			setListFavorites([...listFavorites, data.favorite])
		}
	}

	async function deleteFromFavArray(value) {
		await deleteFavorite(value, token)
		await fetchAsyncToken()
		const newListFavorites = listFavorites.filter((item) => item !== value)
		setListFavorites(newListFavorites)
	}

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<FlatList
					ListHeaderComponent={
						<View style={styles.column}>
							<View style={styles.view}>
								<AutoCompleteComponent
									type={route.params.type}
									styleInput={styles.input}
									OriginOrDestination={OriginOrDestination}
									setIsBtnSubmitDisabled={setIsBtnSubmitDisabled}
									inputValue={inputValue}
									setInputValue={setInputValue}
								/>
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
									title="Favorites"
									list={listFavorites}
									iconName={"delete"}
									func={OriginOrDestination}
									producer={deleteFromFavArray}
								/>
							</View>
							<View style={styles.section}>
								<ListDirectionsComponent
									title="Recent"
									list={listRecents}
									iconName={"star-plus-outline"}
									func={OriginOrDestination}
									producer={addToFavArray}
								/>
							</View>
						</View>
					}
					data={[{ key: "dummy" }]}
					renderItem={() => null}
				/>
			</View>
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
