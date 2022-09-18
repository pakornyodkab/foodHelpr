import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RandomRestaurantsScreen from "./pages/RandomRestaurants/RandomRestaurants";
import HomeScreen from "./pages/Home/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Random Restaurants" component={RandomRestaurantsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}