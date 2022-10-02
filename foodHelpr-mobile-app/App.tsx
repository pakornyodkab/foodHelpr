import React, { useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";

import RandomRestaurantsScreen from "./src/pages/RandomRestaurants/RandomRestaurants";
import HomeScreen from "./src/pages/Home/Home";
import { Platform, View } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      if (Platform.OS === "android") {
        const NavigationBar = require("expo-navigation-bar");
        NavigationBar.setBackgroundColorAsync("white");
      }
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <View
        className="h-full w-full flex-1"
        onLayout={onLayoutRootView}
      >
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
      </View>
    </NavigationContainer>
  );
}
