import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./pages/HomeScreen"
import SignInScreen from "./pages/SignInScreen"
import SignUpScreen from "./pages/SignUpScreen"
import AppBarComponent from "./components/AppBarComponent"
import ChoosePointScreen from "./pages/ChoosePointScreen"
import { Provider } from "react-redux"
import store from "./Redux/store"

const Stack = createNativeStackNavigator()
export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomeScreen}
						options={{ header: () => <AppBarComponent /> }}
					/>
					<Stack.Screen
						name="Sign In"
						component={SignInScreen}
						options={{ header: () => <AppBarComponent /> }}
					/>
					<Stack.Screen
						name="Sign Up"
						component={SignUpScreen}
						options={{ header: () => <AppBarComponent /> }}
					/>
					<Stack.Screen
						name="Choose Point"
						component={ChoosePointScreen}
						options={{ header: () => <AppBarComponent /> }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
