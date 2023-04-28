import { React, useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import {
	TextInput,
	Stack,
	Button,
	ListItem,
	Text,
	ActivityIndicator,
} from "@react-native-material/core"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"

function ListDirectionsComponent({ title, list, iconName }) {
	return (
		<View>
			<Text style={{ marginBottom: 10 }}>{title}</Text>
			{list.reverse().map((listItem, i) => (
				<ListItem
					key={listItem + i}
					title={listItem}
					trailing={(props) => <Icon name={iconName} {...props} />}
				/>
			))}
		</View>
	)
}

export default ListDirectionsComponent
