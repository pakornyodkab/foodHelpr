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
import IRecipe from "../../models/Recipe";
import { getToken } from "../../libs/token";
import RecipeService from "../../apis/recipe";

const mockRecipes:Array<IRecipe> = [{
  recipe_id: "asjghfajskdf",
  name: "Pakorn Sud Aroi",
  picture_url: [
    "https://i.ibb.co/tYV28YL/Yod13.jpg",
    "https://media.discordapp.net/attachments/918571855479189594/1020655655369052201/Yod17.jpg",
    "https://media.discordapp.net/attachments/918571855479189594/1020655174076874763/Yod15.jpg",
  ],
  tags: ["Thai food", "Microwave"],
  kcal: 2000,
  ingredients: [
    {
      picture_url: [
        "https://mw-wellness.com/wp-content/uploads/2019/05/egg.jpg",
        "https://thethaiger.com/th/wp-content/uploads/sites/9/2018/10/iStock-547420626_M.jpg",
      ],
      delivery_info: [
        {
          delivery_type: "DELIVERY_TYPE_BIG_C",
          url: "https://www.bigc.co.th/search?q=%E0%B9%84%E0%B8%82%E0%B9%88%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94",
        },
      ],
      ingredient_id: "633d55a2c5f1956d089afefe",
      name: "ไข่ไก่",
      quantity: 10,
      unit: "Hello",
    },
  ],
  kitchen_tools: [
    "cookingUtensilsA",
    "cookingUtensilsB",
    "cookingUtensilsC",
  ],
  method:
    "1.sadfsdf\n2.sagfsdf\n3.asdfasdf\n\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf",
    tutorial_links: [
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
  recipe_id: "asjghfajskdfno",
  name: "Pakorn give you sweet smile",
  picture_url: [
    "https://i.ibb.co/jRyrWm5/Yod10.png",
    "https://media.discordapp.net/attachments/918571855479189594/1020655174076874763/Yod15.jpg",
  ],
  tags: ["Thai food", "Microwave", "Dessert", "Beverage"],
  kcal: 2000,
  ingredients: [
    {
      picture_url: [
        "https://mw-wellness.com/wp-content/uploads/2019/05/egg.jpg",
        "https://thethaiger.com/th/wp-content/uploads/sites/9/2018/10/iStock-547420626_M.jpg",
      ],
      delivery_info: [
        {
          delivery_type: "DELIVERY_TYPE_BIG_C",
          url: "https://www.bigc.co.th/search?q=%E0%B9%84%E0%B8%82%E0%B9%88%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%94",
        },
      ],
      ingredient_id: "633d55a2c5f1956d089afefe",
      name: "ไข่ไก่",
      quantity: 10,
      unit: "Hello",
    },
  ],
  kitchen_tools: [
    "cookingUtensilsA",
    "cookingUtensilsB",
    "cookingUtensilsC",
  ],
  method:
    "1.sadfsdf\n2.sagfsdf\n3.asdfasdf\n\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf\n\tasdl[fkasdlgjklsadf",
    tutorial_links: [
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

function RecipesResult({ navigation }) {
  const randRecipeFilterDetail = useSelector((state: RootState) => state.randRecipeReducer)

  const [recipeList, setRecipeList] = React.useState<IRecipe[]>([]);

  React.useEffect(() => {
    getRecipes();
  }, []);

  async function getRecipes () {
    try {
      const accessToken = await getToken();
      const recipeService = new RecipeService(accessToken);
      const response = await recipeService.GetRandomRecipe(randRecipeFilterDetail);
      setRecipeList(response.data)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  function genRecipes() {
    return recipeList.map((item:IRecipe) => {
      return (
        <>
          <Pressable onPress={() => handleRecipePress(item)}>
            <RecipeCard imageUrl={item.picture_url[0]} title={item.name} tags={item.tags} kcal={item.kcal} />
          </Pressable>
        </>
      )
    })
  }

  function handleOnPressBack() {
    navigation.goBack();
  }

  function handleOnPressReload() {
    getRecipes()
  }

  function handleRecipePress(item) {
    const props = {
      recipe: item,
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
        <Image
          className="left-2 top-1"
          source={require("../../../assets/RecipeResults.png")}
          style={{ width: 50, height: 60, flex: 0.75, resizeMode: 'contain' }}
        />
      </View>
      <View className="flex-1 top-5 pl-5 pr-5">
        <ScrollView>
          {recipeList.length > 0 && genRecipes()}
        </ScrollView>
      </View>
      <View className="flex flex-col items-center align-bottom p-4 top-3">
        <Button className="h-12 w-12" onPress={handleOnPressReload}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="rotate-right" size={24} />
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default RecipesResult;
