import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";

import Button from "../../components/common/Button";
import topBanner from "../../../assets/topBanner.png";
import {
  getPlatformIcon,
  getPlatformColorScheme,
} from "../../constants/PlatformStyling";
import IRecipe from "../../models/Recipe";
import IIngredient from "../../models/Ingredient";
import RecipeRoutes from "../../routes/recipes";
import IngredientItem from "../../components/recipes/IngredientItem";

export type RecipeDetailParams = {
  recipe: IRecipe;
};

function RecipeDetail({ route, navigation }) {
  const { recipe }: RecipeDetailParams = route.params;

  function handleOnPressBack() {
    navigation.goBack();
  }

  function handleOnPressIngredient(ingredient: IIngredient) {
    const props = { ingredient };
    navigation.navigate(RecipeRoutes.ingredient, props);
  }

  function renderRestaurantImage({ item, index }) {
    return (
      <Image
        key={index}
        source={{ uri: item }}
        className="h-48 w-full"
        resizeMode="contain"
      />
    );
  }

  const getVideoLink = (key: React.Key, platform: string, url: string) => {
    return (
      <Pressable
        key={key}
        className="flex w-12 flex-row items-center"
        onPress={() => Linking.openURL(url)}
      >
        <Text
          className="w-12 text-center"
          style={{
            color: getPlatformColorScheme(platform),
          }}
        >
          <FontAwesome5 name={getPlatformIcon(platform)} size={32} />
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="relative h-full w-full bg-zinc-100">
      <Image
        className="absolute -top-36 z-50"
        source={topBanner}
        style={{ height: 200, width: 400, flex: 1 }}
      />
      <View className="z-10 flex flex-row items-center bg-white px-4 pt-4 pb-2 shadow-xl shadow-green-500">
        <Button className="h-12 w-12" onPress={handleOnPressBack}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="arrow-left" size={16} />
          </Text>
        </Button>
        <Text className="ml-4 text-2xl font-semibold text-green-500">
          Recipe
        </Text>
      </View>
      <ScrollView
        className="w-full flex-1 bg-zinc-100 pt-2"
        overScrollMode="never"
      >
        <View className="mb-4 flex items-center px-4 pb-4">
          <GestureHandlerRootView className="mt-2 flex-1">
            <Carousel
              loop
              pagingEnabled
              snapEnabled
              data={recipe.picture_url}
              renderItem={renderRestaurantImage}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
              }}
              width={280}
              height={200}
            />
          </GestureHandlerRootView>

          <View className="z-10 mb-2 flex min-w-[75%] items-center rounded-lg bg-white px-2 pt-2 shadow shadow-black">
            <Text className="text-2xl font-semibold text-green-500">
              {recipe.name}
            </Text>

            <Text>{recipe.tags.join(", ")}</Text>

            <View className="flex flex-row items-center justify-center gap-1 ">
              <Text className="text-2xl font-semibold text-green-500">
                {recipe.kcal}
              </Text>
              <Text className="text-green-500">Kcal</Text>
            </View>

            <View className="my-2 flex flex-row items-center px-2">
              {recipe.tutorial_links.map((video, idx) =>
                getVideoLink(idx, video.platform, video.url)
              )}
            </View>
          </View>

          <View className="-mt-8 w-full rounded-lg bg-white px-2 pt-8 pb-4 shadow shadow-black">
            <View className="mb-2 w-full px-2">
              <Text className="text-lg font-semibold text-green-500">
                Ingredients:
              </Text>
              {recipe.ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.ingredient_id}
                  ingredient={ingredient}
                />
              ))}
            </View>
            <View className="mb-2 w-full px-2">
              <Text className="text-lg font-semibold text-green-500">
                Cooking utensils:
              </Text>
              {recipe.kitchen_tools.map((dish, idx) => (
                <Text className="my-2 ml-4 text-base" key={idx}>
                  {idx + 1}. {dish}
                </Text>
              ))}
            </View>
            <View className="mb-2 w-full px-2">
              <Text className="text-lg font-semibold text-green-500">
                Steps:
              </Text>
              <Text className="my-2 ml-4 text-base">{recipe.method}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RecipeDetail;
