import { React } from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { GOOGLE_API_KEY } from "@env"

const GooglePlacesInput = () => {
	return (
		<View>
			<GooglePlacesAutocomplete
				styles={{ textInput: styles.input }}
				placeholder="Search..."
				fetchDetails={true}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log("fgha")
					console.log(data, details)
				}}
				query={{
					key: GOOGLE_API_KEY,
					language: "en",
				}}
			/>
		</View>
	)
}
const styles = StyleSheet.create({
	input: {
		borderColor: "#888",
		borderWidth: 1,
	},
})

export default GooglePlacesInput
