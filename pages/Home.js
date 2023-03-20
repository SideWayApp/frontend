import React from "react"
import { View, StyleSheet } from "react-native"

import AppBarComponent from "../components/AppBarComponent"
import DirectionsScreen from "../components/DirectionsScreen"

function Home() {
	return (
		<View style={styles.container}>
			<AppBarComponent />
			<DirectionsScreen />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {},
})

export default Home
