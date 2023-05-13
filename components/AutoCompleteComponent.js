import { React, useState } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { TextInput, Text, ActivityIndicator } from "@react-native-material/core"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { getStreetsStartingWith } from "../axios"

function AutoCompleteComponent({
	type,
	styleInput,
	setIsBtnSubmitDisabled,
	inputValue,
	setInputValue,
}) {
	const [filteredSuggestions, setFilteredSuggestions] = useState([])
	const [showSuggestions, setShowSuggestions] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const onClick = (suggestion) => {
		setInputValue(suggestion)
		setFilteredSuggestions([])
		setShowSuggestions(false)
		setIsBtnSubmitDisabled(false)
	}
	const onChange = async (inputValue) => {
		if (inputValue === "") {
			setInputValue("")
			return
		} else {
			try {
				setIsLoading(true)
				setInputValue(inputValue)
				const filteredSuggestions = await getStreetsStartingWith(inputValue)
				setFilteredSuggestions(filteredSuggestions)
				setIsLoading(false)
				setShowSuggestions(true)
			} catch (error) {
				console.error(error)
				setFilteredSuggestions([])
				setShowSuggestions(false)
			}
		}
	}
	const renderSuggestions = () => {
		if (showSuggestions && inputValue) {
			if (filteredSuggestions.length) {
				if (isLoading) {
					return <ActivityIndicator />
				} else {
					return (
						<FlatList
							data={filteredSuggestions}
							renderItem={({ item }) => (
								<TouchableOpacity>
									<View style={styles.suggestion}>
										<Icon style={{ alignSelf: "center" }} name="map-marker" />
										<Text onPress={() => onClick(item)}>{item}</Text>
										<View style={{ flex: 1, alignItems: "flex-end" }}></View>
									</View>
								</TouchableOpacity>
							)}
							keyExtractor={(item) => item}
						/>
					)
				}
			} else {
				return <Text style={styles.noSuggestions}>No suggestions available.</Text>
			}
		}
		return null
	}
	return (
		<>
			<TextInput
				label={type}
				style={styleInput}
				onChangeText={onChange}
				value={inputValue}
				placeholder="Search"
				variant="outlined"
				leading={(props) => <Icon name="magnify" {...props} />}
				trailing={(props) => (
					<Icon
						name="close"
						onPress={() => {
							if (type === "Origin") {
								setInputValue("")
								setIsBtnSubmitDisabled(true)
							}
							if (type === "Destination") {
								setInputValue("")
								setIsBtnSubmitDisabled(true)
							}
						}}
						{...props}
					/>
				)}
			/>
			{renderSuggestions()}
		</>
	)
}
const styles = StyleSheet.create({
	suggestion: {
		padding: 10,
		backgroundColor: "#eee",
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		flexDirection: "row",
	},
	noSuggestions: {
		padding: 10,
	},
})
export default AutoCompleteComponent
