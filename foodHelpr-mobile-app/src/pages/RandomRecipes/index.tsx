import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import RecipeRoutes from "../../routes/recipes";
import IngredientDetail from "./IngredientDetail";
import RandomRecipes from "./RandomRecipes";
import RecipeDetail from "./RecipeDetail";
import RecipesResult from "./RecipesResult";

const Stack = createStackNavigator();

function RandomRecipesIndex() {
  return (
    <Stack.Navigator
      initialRouteName={RecipeRoutes.main}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={RecipeRoutes.main} component={RandomRecipes} />
      <Stack.Screen name={RecipeRoutes.result} component={RecipesResult} />
      <Stack.Screen name={RecipeRoutes.detail} component={RecipeDetail} />
      <Stack.Screen name={RecipeRoutes.ingredient} component={IngredientDetail} />
    </Stack.Navigator>
  );
}

export default RandomRecipesIndex;
