import React, { useState, useRef, useEffect, Fragment } from "react"
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	TouchableOpacity,
	Animated,
} from "react-native"

const { height: WINDOW_HEIGHT } = Dimensions.get("window")

const HEIGHT_MIN = WINDOW_HEIGHT * 0.125

function LittleInstructions({ duration, distance }) {
	const date = new Date()
	const [currentHour, setCurrentHour] = useState(date.getHours())
	const [currentMinutes, setCurrentMinutes] = useState(date.getMinutes())

	useEffect(() => {
		setCurrentMinutes(date.getMinutes())
	}, [currentMinutes])

	function parseTimeString(timeString) {
		const regex = /(?:(\d+)\s*hours?)?\s*(?:(\d+)\s*mins?)?/
		const matches = timeString.match(regex)

		if (matches) {
			const hours = matches[1] ? parseInt(matches[1]) : 0
			const minutes = matches[2] ? parseInt(matches[2]) : 0

			return new Date(0, 0, 0, hours, minutes)
		}

		return null
	}

	const calculateArrivalTime = (duration) => {
		const time = parseTimeString(duration)
		const mins = time.getHours() * 60 + time.getMinutes()
		if (mins) {
			const currentTime = new Date()
			const futureTime = new Date()
			futureTime.setMinutes(currentTime.getMinutes() + mins)
			if (futureTime.getMinutes() >= 0 && futureTime.getMinutes() <= 9) {
				return futureTime.getHours() + ":0" + futureTime.getMinutes()
			} else {
				return futureTime.getHours() + ":" + futureTime.getMinutes()
			}
		}
	}

	const arrivalTime = calculateArrivalTime(duration)

	const bottomSheetHeight = useRef(new Animated.Value(HEIGHT_MIN)).current

	useEffect(() => {
		const timer = setInterval(() => {
			const date = new Date()
			setCurrentHour(date.getHours())
			setCurrentMinutes(date.getMinutes())
		}, 20000)

		return () => {
			clearInterval(timer)
		}
	}, [])

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.bottomSheet, { height: bottomSheetHeight }]}>
				<TouchableOpacity style={styles.arrowContainer}></TouchableOpacity>
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
