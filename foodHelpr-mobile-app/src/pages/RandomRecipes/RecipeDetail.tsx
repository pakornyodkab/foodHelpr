import {
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
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

export type RecipeDetailParams = {
  recipeName: string;
  imageUrls: string[];
  tags: string[];
  kcal: number;
  ingredients: string[];
  cookingUtensils: string[];
  steps: string;
  videoUrls: {
    platform: string;
    url: string;
  }[];
};

function RecipeDetail({ route, navigation }) {
  const {
    recipeName,
    imageUrls,
    tags,
    kcal,
    ingredients,
    cookingUtensils,
    steps,
    videoUrls,
  }: RecipeDetailParams = route.params;

  function handleOnPressBack() {
    navigation.goBack();
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
        className="flex w-full flex-row items-center"
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
        <Text
          className="flex text-lg"
          style={{
            color: getPlatformColorScheme(platform),
          }}
        >
          Watch on {platform}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="relative h-full w-full bg-white">
      <Image
        className="absolute -top-36"
        source={topBanner}
        style={{ height: 200, width: 400, flex: 1 }}
      />
      <View className="mx-4 mt-4 mb-2 flex flex-row items-center">
        <Button className="h-12 w-12" onPress={handleOnPressBack}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="arrow-left" size={16} />
          </Text>
        </Button>
        <Text className="ml-4 text-2xl font-semibold text-green-500">
          Recipe
        </Text>
      </View>
      <ScrollView className="w-full flex-1" overScrollMode="never">
        <View className="flex items-center px-4 pb-4">
          <GestureHandlerRootView className="flex-1">
            <Carousel
              loop
              pagingEnabled
              snapEnabled
              data={imageUrls}
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

          <Text className="text-2xl font-semibold text-green-500">
            {recipeName}
          </Text>

          <Text>{tags.join(", ")}</Text>

          <View className="flex flex-row items-center justify-center gap-1">
            <Text className="text-2xl font-semibold text-green-500">
              {kcal}
            </Text>
            <Text className="text-green-500">Kcal</Text>
          </View>

          <View className="my-2 w-full px-2">
            {videoUrls.map((video, idx) =>
              getVideoLink(idx, video.platform, video.url)
            )}
          </View>

          <View className="w-full px-2">
            <Text className="font-semibold text-green-500">Ingredients:</Text>
            {ingredients.map((dish, idx) => (
              <Text className="ml-2" key={idx}>
                {idx + 1}. {dish}
              </Text>
            ))}
          </View>
          <View className="w-full px-2">
            <Text className="font-semibold text-green-500">
              Cooking utensils:
            </Text>
            {cookingUtensils.map((dish, idx) => (
              <Text className="ml-2" key={idx}>
                {idx + 1}. {dish}
              </Text>
            ))}
          </View>
          <View className="w-full px-2">
            <Text className="font-semibold text-green-500">Steps:</Text>
            <Text className="ml-2">{steps}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RecipeDetail;
