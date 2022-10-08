import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  NativeSyntheticEvent,
  Text,
  TextInputFocusEventData,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/common/Button";
import RecipeRoutes from "../../routes/recipes";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import NumberSelector from "../../components/restaurants/NumberSelector";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import RecipeService from "../../apis/recipe";
import { getToken } from "../../libs/token";
import IRecipeViewModel from "../../models/RecipeViewModel";

const customizeMultiSelectColor = {
  selectToggleTextColor: "#333",
  primary: "#2CBB54",
};

function RandomRecipes({ navigation }) {
  function handleOnPressBack() {
    navigation.goBack();
  }

  const [selectedTags, setSelectedTags] = React.useState<Array<string>>([]);
  const [includedIngredients, setIncludedIngredients] = React.useState<
    Array<string>
  >([]);
  const [excludedIngredients, setExcludedIngredients] = React.useState<
    Array<string>
  >([]);
  const [excludedUtensils, setexcludedUtensils] = React.useState<Array<string>>(
    []
  );
  const [calRange, setCalRange] = React.useState({ min: 100, max: 1000 });
  const [randomAmount, setRandomAmount] = React.useState<number>(3);

  const dispatch = useDispatch();

  const { setFilter } = bindActionCreators(actionCreators, dispatch);

  function handleOnPressSeeMyRecipes() {
    const filter = {
      tags: selectedTags,
      include_ingredients: includedIngredients,
      exclude_ingredients: excludedIngredients,
      exclude_utensils: excludedUtensils,
      calories_min: calRange.min,
      calories_max: calRange.max,
      random_amount: randomAmount,
    };
    setFilter(filter);
    console.log(filter);
    navigation.navigate(RecipeRoutes.result);
  }

  React.useEffect(() => {
    getFilterList();
  }, []);

  const [recipeViewModel, setRecipeViewModel] =
    React.useState<IRecipeViewModel>(null);
  const [isGenFilterListFinished, setIsGenFilterListFinished] =
    React.useState<boolean>(false);

  const getFilterList = async () => {
    try {
      const accessToken = await getToken();
      const response = await RecipeService.GetRecipeViewModel(accessToken);
      setRecipeViewModel(response.data);
      setIsGenFilterListFinished(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const genFilter = () => {
    if (isGenFilterListFinished) {
      return (
        <View className="top-5 flex pl-5 pr-5">
          <View className="flex-1 pb-3">
            <Text
              className="text-green-500"
              style={{ fontSize: 24, fontWeight: "500" }}
            >
              Tags
            </Text>
            <SectionedMultiSelect
              items={recipeViewModel.tags}
              IconRenderer={Icon}
              uniqueKey="name"
              selectText="Click to select tags..."
              showDropDowns={true}
              readOnlyHeadings={false}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedTags}
              colors={customizeMultiSelectColor}
            />
          </View>
          <View className="flex-1 pb-3">
            <Text
              className="text-green-500"
              style={{ fontSize: 24, fontWeight: "500" }}
            >
              Include ingredients
            </Text>
            <SectionedMultiSelect
              items={recipeViewModel.ingredients}
              IconRenderer={Icon}
              uniqueKey="ingredientId"
              selectText="Click to select ingredients..."
              showDropDowns={true}
              readOnlyHeadings={false}
              onSelectedItemsChange={onSelectedIncludeIngredients}
              selectedItems={includedIngredients}
              colors={customizeMultiSelectColor}
            />
          </View>
          <View className="flex-1 pb-3">
            <Text
              className="text-green-500"
              style={{ fontSize: 24, fontWeight: "500" }}
            >
              Exclude ingredients
            </Text>
            <SectionedMultiSelect
              items={recipeViewModel.ingredients}
              IconRenderer={Icon}
              uniqueKey="ingredientId"
              selectText="Click to select ingredients..."
              showDropDowns={true}
              readOnlyHeadings={false}
              onSelectedItemsChange={onSelectedExcludeIngredients}
              selectedItems={excludedIngredients}
              colors={customizeMultiSelectColor}
            />
          </View>
          <View className="flex-1 pb-3">
            <Text
              className="text-green-500"
              style={{ fontSize: 24, fontWeight: "500" }}
            >
              Exclude cooking utensils
            </Text>
            <SectionedMultiSelect
              items={recipeViewModel.utensils}
              IconRenderer={Icon}
              uniqueKey="name"
              selectText="Click to select utensils..."
              showDropDowns={true}
              readOnlyHeadings={false}
              onSelectedItemsChange={onSelectedExcludeUtensils}
              selectedItems={excludedUtensils}
              colors={customizeMultiSelectColor}
            />
          </View>
          <View className="flex-1 pb-8">
            <Text
              className="pb-3 text-green-500"
              style={{ fontSize: 24, fontWeight: "500" }}
            >
              Calories range
            </Text>
            <View className="flex-row justify-center">
              <TextInput
                className="top-2 h-10 flex-1 rounded-full border-2 border-green-500 px-[20px] text-left"
                onChangeText={onInputMinCal}
                onEndEditing={validateMinCal}
                value={String(calRange.min)}
                placeholder="Min"
                keyboardType="number-pad"
              />
              <Text
                className="top-1 left-6 flex-1 self-center text-green-500 "
                style={{ fontSize: 30 }}
              >
                {" "}
                -{" "}
              </Text>
              <TextInput
                className="top-2 h-10 flex-1 rounded-full border-2 border-green-500 px-[20px] text-left"
                onChangeText={onInputMaxCal}
                onEndEditing={validateMaxCal}
                value={String(calRange.max)}
                placeholder="Max"
                keyboardType="number-pad"
              />
              <Text
                className="top-2 left-5 flex-1 self-center font-semibold text-green-500"
                style={{ fontSize: 15 }}
              >
                KCal
              </Text>
            </View>
          </View>
          <View className="flex-1 pb-8">
            <Text
              className="pb-3 text-green-500"
              style={{ fontSize: 24, fontWeight: "500" }}
            >
              Number of recipes
            </Text>
            <View className="">
              <NumberSelector
                number={randomAmount}
                canIncrease={randomAmount < MAX_RANDOM_AMOUNT}
                canDecrease={randomAmount > MIN_RANDOM_AMOUNT}
                onIncrease={onIncreaseRandomAmount}
                onDecrease={onDecreaseRandomAmount}
              />
            </View>
          </View>
          <View className="bottom-4 flex-1 self-center pb-6">
            <Button
              className="bottom-0 h-12 w-40"
              onPress={handleOnPressSeeMyRecipes}
            >
              <Text className="text-center text-lg font-semibold text-white">
                See my recipes
              </Text>
            </Button>
          </View>
        </View>
      );
    } else {
      return (
        <View className="flex h-full w-full items-center justify-center">
          <ActivityIndicator size="large" color="rgb(34, 197, 94)" />
        </View>
      );
    }
  };

  const MIN_RANDOM_AMOUNT = 1;
  const MAX_RANDOM_AMOUNT = 10;

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedTags(selectedItems);
  };
  const onSelectedIncludeIngredients = (selectedItems) => {
    setIncludedIngredients(selectedItems);
    const index = excludedIngredients.indexOf(
      selectedItems[selectedItems.length - 1],
      0
    );
    if (index > -1) {
      const temp = excludedIngredients;
      temp.splice(index, 1);
      setExcludedIngredients(temp);
    }
  };
  const onSelectedExcludeIngredients = (selectedItems) => {
    setExcludedIngredients(selectedItems);
    const index = includedIngredients.indexOf(
      selectedItems[selectedItems.length - 1],
      0
    );
    if (index > -1) {
      const temp = includedIngredients;
      temp.splice(index, 1);
      setIncludedIngredients(temp);
    }
  };
  const onSelectedExcludeUtensils = (selectedItems) => {
    setexcludedUtensils(selectedItems);
  };

  const onInputMinCal = (minCal) => {
    setCalRange({
      min: minCal,
      max: calRange.max,
    });
  };
  const onInputMaxCal = (maxCal) => {
    setCalRange({
      min: calRange.min,
      max: maxCal,
    });
  };

  const validateCal = (min: number, max: number) => {
    if (min > max) [min, max] = [max, min];
    var validatedCal = {
      min,
      max,
    };
    setCalRange(validatedCal);
  };

  const validateMinCal = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const newMinCal = parseInt(e.nativeEvent.text);
    const validatedMinCal = Math.round(
      Math.max(newMinCal, recipeViewModel.minCal)
    );
    validateCal(validatedMinCal, calRange.max);
  };
  const validateMaxCal = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const newMaxCal = parseInt(e.nativeEvent.text);
    const validatedMaxCal = Math.round(
      Math.min(newMaxCal, recipeViewModel.maxCal)
    );
    validateCal(calRange.min, validatedMaxCal);
  };

  function onIncreaseRandomAmount() {
    setRandomAmount(Math.min(MAX_RANDOM_AMOUNT, randomAmount + 1));
  }

  function onDecreaseRandomAmount() {
    setRandomAmount(Math.max(MIN_RANDOM_AMOUNT, randomAmount - 1));
  }

  return (
    <SafeAreaView className="relative h-full w-full bg-white">
      <Image
        className="absolute -top-36"
        source={require("../../../assets/topBanner.png")}
        style={{ height: 200, width: 400, flex: 1 }}
      />
      <View className="top-3 mx-4 mt-4 flex flex-row items-center pb-5">
        <Button className="h-12 w-12" onPress={handleOnPressBack}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="arrow-left" size={16} />
          </Text>
        </Button>
        <Image
          className="left-2 top-1"
          source={require("../../../assets/FindYourRecipe.png")}
          style={{ width: 50, height: 60, flex: 0.75, resizeMode: "contain" }}
        />
      </View>
      <ScrollView className="h-full w-full flex-1">
        {genFilter()}
      </ScrollView>
    </SafeAreaView>
  );
}

export default RandomRecipes;
