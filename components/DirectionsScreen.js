import React, { useState } from "react"
import { View, Text, TextInput, Button } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { getDirections } from "../axios"

const DirectionsScreen = () => {
	const [origin, setOrigin] = useState("")
	const [destination, setDestination] = useState("")
	const [preference, setPreference] = useState("fastest") // Set default preference value
	const [res, setRes] = useState("")

	const handleGetDirections = async () => {
		try {
			const directions = await getDirections(origin, destination, preference)
			console.log(directions)
			setRes("sex")
			// Do something with the directions, e.g. render a map
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<View>
			<Text>Origin:</Text>
			<TextInput value={origin} onChangeText={setOrigin} />
			<Text>Destination:</Text>
			<TextInput value={destination} onChangeText={setDestination} />
			<Picker selectedValue={preference} onValueChange={setPreference}>
				<Picker.Item label="Clean" value="clean" />
				<Picker.Item label="Shortest" value="acc" />
				<Picker.Item label="Least Walking" value="least_walking" />
			</Picker>
			<Button title="Get Directions" onPress={handleGetDirections} />
			{/* <Text>The text here is: {res}</Text> */}
		</View>
	)
}

export default DirectionsScreen
