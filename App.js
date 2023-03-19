import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, TextInput } from "react-native"
import React, { useState } from "react"
import DirectionsScreen from "./components/DirectionsScreen"
export default function App() {
	return (
		<View style={styles.container}>
			<DirectionsScreen></DirectionsScreen>
			<StatusBar style="auto" />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})
