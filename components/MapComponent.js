import React, { useState, useRef, useEffect, Fragment } from "react"
import { View, StyleSheet, Dimensions, Text } from "react-native"
import MapView from "react-native-maps"
import { FAB } from "react-native-paper"
const { width, height } = Dimensions.get("window")
import * as Location from "expo-location"
import MapItemsComponent from "./MapItemsComponent"
import { getAddressFromLatLng, getAddressFromCoordinates } from "../axios"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import BaseMarkersComponent from "./BaseMarkersComponent"
import OnMapDirections from "./OnMapDirections"
// import CurrentUserLocationComponent from "./CurrentUserLocationComponent"
import BackNavigationFabComponent from "./BackNavigationFabComponent"
import { useDispatch } from "react-redux"
import { setDestination } from "../Redux/DirectionsStore/actions"
import { useNavigation, useRoute } from "@react-navigation/native"
import MapClickedMarker from "./MapClickedMarker"
import CurrentUserLocationComponent from "./CurrentUserLocationComponent"
import LittleInstructions from "./LittleInstructions"
import {getDistance} from "./InstructionsComponent"
import {checkIfIsInRangeOfRoute} from "../utils";

function MapComponent({
	wayPoints,
	polyline,
	isDirection,
	setIsGotDirection,
	duration,
	distance,
	changeDelta
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
	const [lockMap,setLockMap] = useState(true)
	const [region, setRegion] = useState(null)
	const ASPECT_RATIO = width / height
	const LATITUDE_DELTA = 0.02
	const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

  const handleRegionChangeComplete = (newRegion) => {
	if(newRegion.latitudeDelta && newRegion.longitudeDelta){
		// const newLatitudeDelta = 0.001;
		// const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;
		// const latitudeDelta = newRegion.latitudeDelta.toFixed(4);
		// const longitudeDelta = newRegion.longitudeDelta.toFixed(4);	
		// console.log("Region changed", longitudeDelta, latitudeDelta);
		// console.log("new",newLongitudeDelta, " ", newLatitudeDelta);
		// if(latitudeDelta <= newLatitudeDelta.toFixed(4) || longitudeDelta <= newLongitudeDelta.toFixed(4)){
		// 	// setLockMap(true)
		// } 
		
		// else {
		// 	// setLockMap(false)
		// }
		setRegion(newRegion);
	}
	};
	
  const goToCurrentLocation = async () => {
    if (location) {
		setLockMap(true);
	  const { heading, latitude, longitude } = location;
      const newLatitudeDelta = 0.002;
      const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;
      const newPosition = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      };
      mapRef.current.animateToRegion(newPosition);
	  setLockMap(true);

    //   console.log(location);
    //   mapRef.current.animateCamera(
    //     {
    //       center: {
    //         latitude: latitude,
    //         longitude: longitude,
    //       },
    //       heading: heading,
    //       // pitch: 0,
    //       zoom: 15,
    //     },
    //     { duration: 1000 }
    //   );
      handleRegionChangeComplete({ latitude: latitude, longitude: longitude });
    }
  };

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

  useEffect(() => {
    const asyncLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant permission...");
        return;
      } else {
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 5000,
            distanceInterval: 3,
          },
          (curLocation) => {
            console.log("watchPosition", curLocation);
            const { latitude, longitude, heading } = curLocation.coords;
				setLocation({
					latitude: latitude,
					longitude: longitude,
					heading: heading,
				  });
				              
            }
        );
      }
    };
    asyncLocation();
  }, []);


  useEffect(()=>{
	console.log("LockMap", lockMap);
	if(location){
		const { latitude, longitude, heading } = location;
		if (initialPosition === null) {
			console.log("initial", initialPosition);
			const data = {
				latitude: latitude,
				longitude: longitude,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			};
			setInitialPosition(data);
		}
		if(lockMap && mapRef.current){
			// console.log("location in useEffect is " + location)
			const newLatitudeDelta = 0.002;
			const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;
			const newPosition = {
				latitude: latitude,
				longitude: longitude,
				latitudeDelta: newLatitudeDelta,
				longitudeDelta: newLongitudeDelta,
			};
			// console.log("newPos",newPosition)
			// console.log(mapRef.current)
			mapRef.current.animateToRegion(newPosition);

		}
	}
  },[location,lockMap,mapRef])

  useEffect(()=>{
	if(changeDelta){
		mapRef.current.animateToRegion({
			longitude:changeDelta.longitude,
			latitude:changeDelta.latitude,
			latitudeDelta:changeDelta.latitudeDelta ,
			longitudeDelta:changeDelta.longitudeDelta,
		})
	}
  },[changeDelta])

  useEffect(()=>{
	if(region){
		const {longitudeDelta,latitudeDelta} = region;
		const newLatitudeDelta = 0.002;
		const newLongitudeDelta = newLatitudeDelta * ASPECT_RATIO;
		console.log("Use Effect Region",latitudeDelta,longitudeDelta,newLongitudeDelta);
		if(latitudeDelta.toFixed(4) >= newLatitudeDelta && longitudeDelta.toFixed(4) >= newLongitudeDelta) setLockMap(false);
	}
  },[region])
	return (
		<View style={styles.container}>
			{initialPosition && (
				<>
					<MapView
						mapPadding={{ top: 0, right: 0, bottom: 0, left: 50 }}
						style={styles.map}
						initialRegion={initialPosition}
						ref={mapRef}
						onRegionChangeComplete={handleRegionChangeComplete}
						onPress={handleMapPress}
						// scrollEnabled={lockMap}
						showsUserLocation={true}

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
						{isDirection &&  (
							<>
								<BaseMarkersComponent wayPoints={wayPoints} polylinePoints={polyline} location={location} />
								<OnMapDirections wayPoints={wayPoints} polylinePoints={polyline} />
							</>
						)}
						{region && <MapItemsComponent region={region} />}
					</MapView>
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
})

export default MapComponent
