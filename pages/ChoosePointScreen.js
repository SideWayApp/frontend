import { React, useState } from "react"
import DirectionsComponent from "../components/DirectionsComponent"
import { View, Image } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import {
	TextInput,
	Stack,
	Button,
	ListItem,
	Text,
} from "@react-native-material/core"
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { useSelector, useDispatch } from "react-redux"
import { setOrigin, setDestination } from "../Redux/DirectionsStore/actions"

function ChoosePointScreen({ route, navigation }) {
	const dispatch = useDispatch()
	const { origin, destination } = useSelector((state) => state)
	const handleSaveAddress = (event) => {
		if (route.params.type === "Origin") {
			dispatch(setOrigin(event.nativeEvent.text))
		}
		if (route.params.type === "Destination") {
			dispatch(setDestination(event.nativeEvent.text))
		}
		navigation.goBack()
	}

	return (
		<View>
			<Stack spacing={0}>
				<View
					style={{
						flexDirection: "column",
						alignSelf: "center",
						width: "99%",
						gap: 5,
					}}
				>
					<View style={{ gap: 10 }}>
						<TextInput
							label={route.params.type}
							value={route.params.type === "Origin" ? origin : destination}
							onChangeText={(text) => {
								if (route.params.type === "Origin") {
									dispatch(setOrigin(text))
								}
								if (route.params.type === "Destination") {
									dispatch(setDestination(text))
								}
							}}
							onEndEditing={handleSaveAddress}
							variant="outlined"
							leading={(props) => <Icon name="magnify" {...props} />}
						></TextInput>
						<Button
							title="Your current location"
							trailing={(props) => <Icon name="" {...props} />}
						></Button>
						<Button
							title="Choose on map"
							trailing={(props) => <Icon name="map" {...props} />}
						></Button>
					</View>
					<View
						style={{
							alignSelf: "center",
							width: "99%",
							borderWidth: 1,
							borderColor: "black",
							borderRadius: 5,
						}}
					>
						<Text>Recent</Text>
						<ListItem
							title="List Item"
							trailing={(props) => <Icon name="star" {...props} />}
						/>
						<ListItem
							title="List Item"
							trailing={(props) => <Icon name="star" {...props} />}
						/>
						<ListItem
							title="List Item"
							trailing={(props) => <Icon name="star" {...props} />}
						/>
					</View>
				</View>
			</Stack>
		</View>
	)
}

export default ChoosePointScreen
