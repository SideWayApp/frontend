import React, { useState } from "react"
import {
	StyleSheet,
	TextInput,
	FlatList,
	TouchableOpacity,
	Text,
	View,
} from "react-native"

const Autocomplete = ({ suggestions }) => {
	const [inputValue, setInputValue] = useState("")
	const [filteredSuggestions, setFilteredSuggestions] = useState([])
	const [showSuggestions, setShowSuggestions] = useState(false)

	const onChange = (inputValue) => {
		const filteredSuggestions = suggestions.filter(
			(suggestion) =>
				suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) === 0
		)

		setInputValue(inputValue)
		setFilteredSuggestions(filteredSuggestions)
		setShowSuggestions(true)
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
								<Text style={styles.suggestion}>{item}</Text>
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
		<View>
			<TextInput
				style={styles.input}
				onChangeText={onChange}
				value={inputValue}
				placeholder="Search"
			/>
			{renderSuggestions()}
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		marginBottom: 10,
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

export default Autocomplete
