import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RandomRestaurantsScreen from "./src/pages/RandomRestaurants/RandomRestaurants";
import HomeScreen from "./src/pages/Home/Home";

const Stack = createStackNavigator();

export default function App() {
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
