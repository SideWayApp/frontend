import React, { useState, useRef, useEffect } from "react"
import {
	View,
	StyleSheet,
	Dimensions,
	Modal,
	Text,
	TouchableOpacity,
} from "react-native"
import MapView from "react-native-maps"
import { FAB } from "react-native-paper"
import * as Location from "expo-location"
import MapItemsComponent from "./MapItemsComponent"
import { getAddressFromLatLng, getAddressFromCoordinates } from "../axios"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import BaseMarkersComponent from "./BaseMarkersComponent"
import OnMapDirections from "./OnMapDirections"
import BackNavigationFabComponent from "./BackNavigationFabComponent"
import { useDispatch } from "react-redux"
import { setDestination } from "../Redux/DirectionsStore/actions"
import { useNavigation } from "@react-navigation/native"
import MapClickedMarker from "./MapClickedMarker"
import CurrentUserLocationComponent from "./CurrentUserLocationComponent"
import LittleInstructions from "./LittleInstructions"
import { useSelector } from "react-redux"
import { updateExistMapItem } from "../axios"
import { setIsWalking } from "../Redux/IsWalkingStore/IsWalkingActions"

const { width, height } = Dimensions.get("window")
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.02
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

function MapComponent({
	wayPoints,
	polyline,
	isDirection,
	setIsGotDirection,
	duration,
	distance,
	changeDelta,
	getRoute,
}) {
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const mapRef = useRef(null)
	const markerRef = useRef(null)
	const [location, setLocation] = useState(null)
	const [coordinates, setCoordinates] = useState(null)
	const [isMapClicked, setIsMapClicked] = useState(false)
	const [clickedAddress, setClickedAddress] = useState("")
	const [initialPosition, setInitialPosition] = useState(null)
	const [lockMap, setLockMap] = useState(true)
	const [region, setRegion] = useState(null)
	const [modalVisible, setModalVisible] = useState(false)
	const [simpleModalVisible, setSimpleModalVisible] = useState(false)
	const [selectedMapItemType, setSelectedMapItemType] = useState("")
	const [selectedMapItemId, setSelectedMapItemId] = useState("")
	const user = useSelector((state) => state.auth.user)
	const [title, setTitle] = useState("check")
	const { isWalking } = useSelector((state) => state.isWalking)

	const handleRegionChangeComplete = (newRegion) => {
		if (newRegion.latitudeDelta && newRegion.longitudeDelta) {
			setRegion(newRegion)
		}
	}

	const goToCurrentLocation = () => {
		if (location) {
			// setLockMap(true)
			dispatch(setIsWalking(true))
			const { heading, latitude, longitude } = location
			const newLatitudeDelta = 0.002
			const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO
			const newPosition = {
				latitude: latitude,
				longitude: longitude,
				latitudeDelta: newLatitudeDelta,
				longitudeDelta: newLongitudeDelta,
			}
			mapRef.current.animateToRegion(newPosition)
			handleRegionChangeComplete({ latitude: latitude, longitude: longitude })
		}
	}

	const handleNavigation = async () => {
		try {
			let dest = await getAddressFromLatLng(
				coordinates.latitude,
				coordinates.longitude
			)
			dispatch(setDestination(dest))
		} catch (error) {
			console.error("Could not found", error)
		}
	}

	const handleMapPress = async (event) => {
		const { latitude, longitude } = event.nativeEvent.coordinate
		if (isMapClicked) {
			setIsMapClicked(false)
		} else {
			setIsMapClicked(true)
			setCoordinates({ latitude, longitude })
		}
		try {
			const address = await getAddressFromCoordinates(latitude, longitude)
			setClickedAddress(address)
		} catch (error) {
			console.log(error)
		}
	}

	const handleOnLayout = () => {
		markerRef.current.showCallout()
	}

	const handleCalloutPress = (type, mapItemId) => {
		setSelectedMapItemType(type)
		setSelectedMapItemId(mapItemId)

		let title = ""
		let changeable = null
		switch (type) {
			case "Beach":
			case "Camera":
			case "Dangerous Building":
			case "Defibrillator":
			case "Fountain":
			case "Light Post":
			case "MADA Station":
			case "Museum":
			case "Polluted Area":
			case "Shelter":
			case "Public WIFI Hotspots":
				title = "This data is immutable"
				changeable = false
				break
			case "Danger":
			case "Flood":
			case "Protest":
			case "Poop":
			case "Constraction":
				title = "Still there?"
				changeable = true
				break
			case "No lights":
				title = "Still no lights?"
				changeable = true
				break
			case "Dirty":
				title = "Still dirty?"
				changeable = true
				break
			case "No shadow":
				title = "Still no shdaow?"
				changeable = true
				break
		}
		setTitle(title)
		if (changeable) {
			setModalVisible(!modalVisible)
		} else {
			setSimpleModalVisible(!simpleModalVisible)
		}
	}

	const handleCloseModal = () => {
		setModalVisible(false)
	}

	const handleCloseSimpleModal = () => {
		setSimpleModalVisible(false)
	}

	const handleNoPressed = () => {
		const data = {
			_id: selectedMapItemId,
			userEmail: user.email,
		}
		updateExistMapItem(data)
		setModalVisible(false)
	}

	useEffect(() => {
		const asyncLocation = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== "granted") {
				console.log("Please grant permission...")
				return
			} else {
				Location.watchPositionAsync(
					{
						accuracy: Location.Accuracy.High,
						timeInterval: 10000,
						distanceInterval: 5,
					},
					(curLocation) => {
						const { latitude, longitude, heading } = curLocation.coords
						setLocation({
							latitude: latitude,
							longitude: longitude,
							heading: heading,
						})
					}
				)
			}
		}
		asyncLocation()
	}, [])

	useEffect(() => {
		if (location) {
			const { latitude, longitude, heading } = location
			if (initialPosition === null) {
				const data = {
					latitude: latitude,
					longitude: longitude,
					latitudeDelta: LATITUDE_DELTA,
					longitudeDelta: LONGITUDE_DELTA,
				}
				setInitialPosition(data)
			}
		}
	}, [location])

	useEffect(() => {
		if (changeDelta) {
			const edgePadding = {
				top: 100,
				right: 100,
				bottom: 100,
				left: 100,
			}
			mapRef.current?.fitToCoordinates(changeDelta, {
				edgePadding: edgePadding,
				animated: true,
			})
		}
	}, [changeDelta])

	return (
		<View style={styles.container}>
			{initialPosition && (
				<>
					<MapView
						style={styles.map}
						initialRegion={initialPosition}
						ref={mapRef}
						onRegionChangeComplete={handleRegionChangeComplete}
						onPress={handleMapPress}
						showsUserLocation={true}
						followsUserLocation={isWalking}
						showsMyLocationButton={false}
						scrollEnabled={!isWalking}
        				zoomEnabled={!isWalking}
					>
						{location && <CurrentUserLocationComponent location={location} />}
						{isMapClicked && !isDirection && (
							<MapClickedMarker
								handleNavigation={handleNavigation}
								handleOnLayout={handleOnLayout}
								coordinates={coordinates}
								markerRef={markerRef}
								clickedAddress={clickedAddress}
							/>
						)}
						{isDirection && (
							<>
								<BaseMarkersComponent
									wayPoints={wayPoints}
									polylinePoints={polyline}
									location={location}
								/>
								<OnMapDirections
									wayPoints={wayPoints}
									polylinePoints={polyline}
									location={location}
									getRoute={getRoute}
									mapRef={mapRef}
								/>
							</>
						)}
						{region && (
							<MapItemsComponent
								region={region}
								handleCalloutPress={handleCalloutPress}
							/>
						)}
					</MapView>

					<Modal
						visible={simpleModalVisible}
						animationType="slide"
						transparent={true}
					>
						<View style={styles.modalContainer}>
							<View style={styles.modalContent}>
								<Text style={styles.modalText}> {title}</Text>
								<TouchableOpacity
									style={styles.button}
									onPress={handleCloseSimpleModal}
								>
									<Text style={styles.closeButtonText}>Close</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>

					<Modal visible={modalVisible} animationType="slide" transparent={true}>
						<View style={styles.modalContainer}>
							<View style={styles.modalContent}>
								<Text style={styles.modalText}>{selectedMapItemType}</Text>
								<Text style={styles.modalText}> {title}</Text>
								<View style={{ flexDirection: "row" }}>
									<TouchableOpacity style={styles.button} onPress={handleCloseModal}>
										<Text style={styles.closeButtonText}>Yes</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.button} onPress={handleNoPressed}>
										<Text style={styles.closeButtonText}>No</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</Modal>

					<View style={[styles.container, isDirection && styles.containerHigher]}>
						<BackNavigationFabComponent
							moveTo={goToCurrentLocation}
							location={location}
							setIsGotDirection={setIsGotDirection}
						/>
						<FAB
							style={styles.fab}
							onPress={() => navigation.navigate("Report", { location: location })}
							icon={() => (
								<View style={styles.iconContainer}>
									<Icon name="plus" size={30} color="black" />
								</View>
							)}
							animated={false}
						/>
					</View>

					{isDirection && (
						<LittleInstructions
							duration={duration}
							distance={distance}
						></LittleInstructions>
					)}
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
	},
	map: {
		width: "100%",
		height: "100%",
		alignItems: "center",
	},
	markerContainer: {
		borderColor: "#000",
		padding: 0,
		borderRadius: 100,
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
		zIndex: 1,
		borderRadius: 100,
		backgroundColor: "lightyellow",
	},
	iconContainer: {
		justifyContent: "center",
		width: 30,
		height: 30,
		bottom: 3,
		alignSelf: "center",
		alignItems: "center",
	},
	button: {
		zIndex: 999,
		backgroundColor: "lightblue",
		padding: 10,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: "#000",
	},
	navigationButton: {
		zIndex: 999,
	},
	buttonText: {
		fontWeight: "bold",
		textAlign: "center",
	},
	containerHigher: {
		marginTop: -200,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#2196F3",
		borderRadius: 5,
		padding: 10,
		margin: 10,
		elevation: 2,
	},
	closeButtonText: {
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
	},
})

export default MapComponent
