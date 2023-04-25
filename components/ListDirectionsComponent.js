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

function ListDirectionsComponent({ title, list }) {
	// const [list, setList] = useState(["a", "b", "c", "d"])

	return (
		<View>
			<Text style={{ marginBottom: 10 }}>{title}</Text>
			{list.map((listItem) => (
				<ListItem
					key={listItem}
					title={listItem}
					trailing={(props) => <Icon name="star-plus-outline" {...props} />}
				/>
			))}
		</View>
	)
}

export default ListDirectionsComponent
