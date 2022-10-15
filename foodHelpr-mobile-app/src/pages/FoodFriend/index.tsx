import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import FoodFriendRoutes from "../../routes/foodFriend";
import CreateParty from "../Party/CreateParty/CreateParty";
import MyParty from "../Party/MyParty/MyParty";
import SearchParty from "../Party/SearchParty/SearchParty";
import FoodFriendScreen from "./FoodFriendScreen";

const Stack = createStackNavigator();

function FoodFriendIndex() {
  return (
    <Stack.Navigator
      initialRouteName={FoodFriendRoutes.main}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={FoodFriendRoutes.main} component={FoodFriendScreen} />
      <Stack.Screen name={FoodFriendRoutes.createParty} component={CreateParty} />
      <Stack.Screen name={FoodFriendRoutes.searchParty} component={SearchParty} />
      <Stack.Screen name={FoodFriendRoutes.myParty} component={MyParty} />
    </Stack.Navigator>
  );
}

export default FoodFriendIndex;
