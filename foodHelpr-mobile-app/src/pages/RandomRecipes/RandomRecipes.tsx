import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/common/Button";
import RecipeRoutes from "../../routes/recipes";

import topBanner from "../../../assets/topBanner.png";

function RandomRecipes({ navigation }) {
  function handleOnPressBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="relative h-full w-full bg-white">
      <Image
        className="absolute -top-36"
        source={topBanner}
        style={{ height: 200, width: 400, flex: 1 }}
      />
      <View className="mx-4 mt-4 flex flex-row items-center">
        <Button className="h-12 w-12" onPress={handleOnPressBack}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="arrow-left" size={16} />
          </Text>
        </Button>
        <Text className="ml-4 text-2xl font-semibold text-green-500">
          Recipe
        </Text>
      </View>
      <Button
        className="absolute bottom-0 h-12 w-40"
        onPress={() => navigation.navigate(RecipeRoutes.result)}
      >
        <Text className="text-center text-lg font-semibold text-white">
          See my recipes
        </Text>
      </Button>
    </SafeAreaView>
  );
}

export default RandomRecipes;
