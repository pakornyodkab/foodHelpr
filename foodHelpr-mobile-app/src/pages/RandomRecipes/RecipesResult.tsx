import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View, Pressable } from "react-native";
import Button from "../../components/common/Button";
import RecipeRoutes from "../../routes/recipes";
import { FontAwesome } from "@expo/vector-icons";
import { RecipeDetailParams } from "./RecipeDetail";
import RecipeCard from '../../components/recipes/RecipeCard'
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

interface recipeDetail{
  recipeName: string,
  imageUrls: Array<string>,
  tags: Array<string>,
  kcal: number,
  ingredients: Array<string>,
  cookingUtensils: Array<string>,
  steps: string,
  videoUrls: any,
}

function RecipesResult({ navigation }) {
  const randRecipeFilterDetail = useSelector((state: RootState) => state.randRecipeReducer)

  const [recipeList, setRecipeList] = React.useState<Array<Object>>([]);

  React.useEffect(() => {
    getRecipes();
  }, []);

  const mockRecipes = [{
    recipeName: "Pakorn Sud Aroi",
    imageUrls: [
      "https://i.ibb.co/tYV28YL/Yod13.jpg",
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
  }, {
    recipeName: "Pakorn give you sweet smile",
    imageUrls: [
      "https://i.ibb.co/jRyrWm5/Yod10.png",
      "https://media.discordapp.net/attachments/918571855479189594/1020655174076874763/Yod15.jpg",
    ],
    tags: ["Thai food", "Microwave", "Dessert", "Beverage"],
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
  }
  ]

  function getRecipes() {
    //do query
    setRecipeList(mockRecipes)
  }

  function genRecipes() {
    return recipeList.map((item:recipeDetail) => {
      return (
        <>
          <Pressable onPress={() => handleRecipePress()}>
            <RecipeCard imageUrl={item.imageUrls[0]} title={item.recipeName} tags={item.tags} kcal={item.kcal} />
          </Pressable>
        </>
      )
    })

  }

  function handleOnPressBack() {
    navigation.goBack();
  }

  function handleOnPressReload() {
    console.log('Contents in rudux:', randRecipeFilterDetail)

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
        source={require("../../../assets/topBanner.png")}
        style={{ height: 200, width: 400, flex: 1 }}
      />
      <View className="mx-4 mt-4 flex flex-row items-center top-3">
        <Button className="h-12 w-12" onPress={handleOnPressBack}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="arrow-left" size={16} />
          </Text>
        </Button>
        {/* <Text className="ml-4 text-2xl font-semibold text-black">
          Find Your
        </Text>
        <Text className="ml-4 text-2xl font-semibold text-green-500 right-2" style={{fontFamily: 'inter'}}>
          Recipe
        </Text> */}
        <Image
          className="left-2 top-1"
          source={require("../../../assets/RecipeResults.png")}
          style={{ width: 50, height: 60, flex: 0.75, resizeMode: 'contain' }}
        />
      </View>
      <View className="flex-1 top-5 pl-5 pr-5">
        {/* <ScrollView>
          <Pressable onPress={() => handleRecipePress()}>
            <RecipeCard imageUrl="https://i.ibb.co/tYV28YL/Yod13.jpg" title="Pakorn Sud Aroi" tags={["Thai food", "Microwave"]} kcal="2000" />
          </Pressable>
          <Pressable onPress={() => handleRecipePress()}>
            <RecipeCard imageUrl="https://i.ibb.co/jRyrWm5/Yod10.png" title="Pakorn give you sweet smile" tags={["Thai food", "Microwave", "Dessert", "Beverage"]} kcal="2000" />
          </Pressable>
        </ScrollView> */}
        <ScrollView>
          {recipeList.length > 0 && genRecipes()}
        </ScrollView>
      </View>
      <View className="flex flex-col items-center align-bottom p-4">
        <Button className="h-12 w-12" onPress={handleOnPressReload}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="rotate-right" size={24} />
          </Text>
        </Button>
      </View>
      {/* <Button
        className="absolute bottom-0 h-12 w-40"
        onPress={() => handleRecipePress()}
      >
        <Text className="text-center text-lg font-semibold text-white">
          temp
        </Text>
      </Button> */}
    </SafeAreaView>
  );
}

export default RecipesResult;
