import React, { useState, useRef, useEffect, Fragment } from "react"
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	TouchableOpacity,
	Animated,
} from "react-native"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window")
const HEIGHT_MAX = WINDOW_HEIGHT * 0.2
const HEIGHT_MIN = WINDOW_HEIGHT * 0.125

function LittleInstructions({ duration, distance }) {
	const date = new Date()
	const [currentHour, setCurrentHour] = useState(date.getHours())
	const [currentMinutes, setCurrentMinutes] = useState(date.getMinutes())

	useEffect(() => {
		setCurrentMinutes(date.getMinutes())
	}, [currentMinutes])

	const calculateArrivalTime = (duration) => {
		const minutes = parseInt(duration.split(" ")[0])

		const totalMinutes = currentHour * 60 + currentMinutes + minutes
		const arrivalHour = Math.floor(totalMinutes / 60) % 24
		const arrivalMinutes = totalMinutes % 60

		return `${arrivalHour.toString().padStart(2, "0")}:${arrivalMinutes
			.toString()
			.padStart(2, "0")}`
	}

	const arrivalTime = calculateArrivalTime(duration)

	const [expanded, setExpanded] = useState(false)
	const bottomSheetHeight = useRef(new Animated.Value(HEIGHT_MIN)).current

	const toggleBottomSheet = () => {
		const toValue = expanded ? HEIGHT_MIN : HEIGHT_MAX
		Animated.timing(bottomSheetHeight, {
			toValue,
			duration: 300,
			useNativeDriver: false,
		}).start(() => {
			setExpanded(!expanded)
		})
	}

	useEffect(() => {
		const timer = setInterval(() => {
			const date = new Date()
			setCurrentHour(date.getHours())
			setCurrentMinutes(date.getMinutes())
		}, 10000)

		return () => {
			clearInterval(timer)
		}
	}, [])

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.bottomSheet, { height: bottomSheetHeight }]}>
				<TouchableOpacity onPress={toggleBottomSheet} style={styles.arrowContainer}>
					<Icon
						style={styles.arrow}
						size={35}
						name={expanded ? "chevron-down" : "chevron-up"}
					/>
				</TouchableOpacity>
				<View style={styles.body}>
					<Text style={styles.text}>{"Arrival at " + arrivalTime}</Text>
					<Text style={styles.text}>{duration}</Text>
					<Text style={styles.text}>{distance}</Text>
				</View>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bottomSheet: {
		position: "absolute",
		width: "100%",
		bottom: 0,
		backgroundColor: "white",
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
	},
	arrowContainer: {
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		height: 25,
		width: 60,
		borderRadius: 30,
		marginTop: 10,
	},
	arrow: {
		color: "black",
	},
	body: {
		flexDirection: "row",
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		gap: "10",
	},
	text: {
		fontSize: 15,
		color: "black",
		borderRadius: 10,
		padding: 5,
		textAlign: "center",
	},
})

export default LittleInstructions
