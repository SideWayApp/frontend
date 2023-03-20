import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./pages/HomeScreen";
import SignInScreen from "./pages/SignInScreen";
import AppBarComponent from "./components/AppBarComponent";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
