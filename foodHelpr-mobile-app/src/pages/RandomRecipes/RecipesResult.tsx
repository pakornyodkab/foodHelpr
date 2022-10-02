import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View } from "react-native";
import Button from "../../components/common/Button";
import RecipeRoutes from "../../routes/recipes";
import { FontAwesome } from "@expo/vector-icons";
import { RecipeDetailParams } from "./RecipeDetail";

import topBanner from "../../../assets/topBanner.png";

function RecipesResult({ navigation }) {
  function handleOnPressBack() {
    navigation.goBack();
  }

  function handleRecipePress() {
    const props: RecipeDetailParams = {
      recipeName: "recipeName",
      imageUrls: [
        "https://media.discordapp.net/attachments/918571855479189594/1020655655369052201/Yod17.jpg",
        "https://media.discordapp.net/attachments/918571855479189594/1020655174076874763/Yod15.jpg",
      ],
      tags: ["Thai food", "Microwave"],
      kcal: 2000,
      ingredients: ["ingredientA", "ingredientB", "ingredientC"],
      cookingUtensils: [
        "cookingUtensilsA",
        "cookingUtensilsB",
        "cookingUtensilsC",
      ],
      steps:
        "1.sadfsdf\n2.sagfsdf\n3.asdfasdf\n\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf",
      videoUrls: [
        {
          platform: "YouTube",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        {
          platform: "facebook",
          url: "https://www.facebook.com/gssspotted",
        },
      ],
    };
    navigation.navigate(RecipeRoutes.detail, props);
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
        onPress={() => handleRecipePress()}
      >
        <Text className="text-center text-lg font-semibold text-white">
          temp
        </Text>
      </Button>
    </SafeAreaView>
  );
}

export default RecipesResult;
