import { React, useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { ListItem, Text } from "@react-native-material/core"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"

function ListDirectionsComponent({ title, list, iconName, func }) {
	return (
		<View>
			<Text style={{ marginBottom: 10 }}>{title}</Text>
			{list.reverse().map((listItem, i) => (
				<ListItem
					key={listItem + i}
					title={listItem}
					onPress={(event) => {
						event.stopPropagation()
						if (func) {
							func(listItem)
						}
					}}
					trailing={(props) => (
						<Icon
							name={iconName}
							onPress={(event) => {
								event.stopPropagation()
								if (func) {
									func(listItem)
								}
							}}
							{...props}
						/>
					)}
				/>
			))}
		</View>
	)
}

export default ListDirectionsComponent
