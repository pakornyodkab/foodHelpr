import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RandomRestaurantsScreen from "./src/pages/RandomRestaurants/RandomRestaurants";
import HomeScreen from "./src/pages/Home/Home";
import { Platform } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    if (Platform.OS === "android") {
      const NavigationBar = require("expo-navigation-bar");
      NavigationBar.setBackgroundColorAsync("white");
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Random Restaurants"
          component={RandomRestaurantsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
