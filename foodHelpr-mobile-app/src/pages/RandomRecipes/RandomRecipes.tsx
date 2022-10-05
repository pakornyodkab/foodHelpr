import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MultiSelect from 'react-native-multiple-select';
import Button from "../../components/common/Button";
import RecipeRoutes from "../../routes/recipes";
import { ScrollView, TextInput, } from "react-native-gesture-handler";
import NumberSelector from "../../components/restaurants/NumberSelector";

function RandomRecipes({ navigation }) {
  function handleOnPressBack() {
    navigation.goBack();
  }

  const [selectedTags, setSelectedTags] = React.useState<Array<string>>([]);
  const [includedIngredients, setIncludedIngredients] = React.useState<Array<string>>([]);
  const [excludedIngredients, setExcludedIngredients] = React.useState<Array<string>>([]);
  const [excludedUtensils, setexcludedUtensils] = React.useState<Array<string>>([]);
  const [minCal, setMinCal] = React.useState<String>('');
  const [maxCal, setMaxCal] = React.useState<String>('');
  const [randomAmount, setRandomAmount] = React.useState<number>(3);

  const tags = [{
    id: '92iijs7yta',
    name: 'Thai food'
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Italian food'
  }, {
    id: '16hbajsabsd',
    name: 'Zimbabwe food'
  }, {
    id: 'nahs75a5sg',
    name: 'Japanese food'
  }, {
    id: '667atsas',
    name: 'Drinks'
  },
  ];

  const ingredients = [{
    id: '92iijs7yta',
    name: 'Pork'
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Lotus',
  }, {
    id: '16hbajsabsd',
    name: 'Lime'
  }, {
    id: 'nahs75a5sg',
    name: 'Robster'
  }, {
    id: '667atsas',
    name: 'Tomato suace'
  },
  ];

  const utensils = [{
    id: '92iijs7yta',
    name: 'Wok'
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Mortar',
  }, {
    id: '16hbajsabsd',
    name: 'Microwave'
  }, {
    id: 'nahs75a5sg',
    name: 'Stove'
  }, {
    id: '667atsas',
    name: 'Flame thrower'
  },
  ];

  const MIN_RANDOM_AMOUNT = 1;
  const MAX_RANDOM_AMOUNT = 10;

  const onSelectedItemsChange = selectedItems => {
    setSelectedTags(selectedItems)
  };
  const onSelectedIncludeIngredients = selectedItems => {
    setIncludedIngredients(selectedItems)
    const index = excludedIngredients.indexOf(selectedItems[selectedItems.length - 1], 0);
    console.log(index)
    if (index > -1) {
      const temp = excludedIngredients
      temp.splice(index, 1);
      setExcludedIngredients(temp)
    }
  };
  const onSelectedExcludeIngredients = selectedItems => {
    setExcludedIngredients(selectedItems)
    const index = includedIngredients.indexOf(selectedItems[selectedItems.length - 1], 0);
    console.log(index)
    if (index > -1) {
      const temp = includedIngredients
      temp.splice(index, 1);
      setIncludedIngredients(temp)
    }
  };
  const onSelectedExcludeUtensils = selectedItems => {
    setexcludedUtensils(selectedItems)
  };
  const onInputMinCal = minCal => {
    setMinCal(minCal)
  }
  const onInputMaxCal = manCal => {
    setMaxCal(manCal)
  }

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
            source={require("../../../assets/FindYourRecipe.png")}
            style={{ width: 50, height: 60, flex: 0.75, resizeMode: 'contain' }}
          />
        </View>
        <View className="flex top-5 pl-5 pr-5">
        <ScrollView>
        <KeyboardAvoidingView behavior="position">
          <View className="flex-1 pb-3">
            <Text className="text-green-500" style={{ fontSize: 24, fontWeight: "500" }}>Tags</Text>
            <MultiSelect
              // hideTags
              items={tags}
              uniqueKey="id"
              // ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedTags}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              // onChangeInput={ (text)=> console.log(text)}
              // altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#2CBB54"
              tagBorderColor="#2CBB54"
              tagTextColor="#2CBB54"
              selectedItemTextColor="#2CBB54"
              selectedItemIconColor="#2CBB54"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#000000' }}
              submitButtonColor="#2CBB54"
              submitButtonText="Select these tags"
            />
          </View>
          <View className="flex-1 pb-3">
            <Text className="text-green-500" style={{ fontSize: 24, fontWeight: "500" }}>Include ingredients</Text>
            <MultiSelect
              // hideTags
              items={ingredients}
              uniqueKey="id"
              // ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={onSelectedIncludeIngredients}
              selectedItems={includedIngredients}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              // onChangeInput={ (text)=> console.log(text)}
              // altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#2CBB54"
              tagBorderColor="#2CBB54"
              tagTextColor="#2CBB54"
              selectedItemTextColor="#2CBB54"
              selectedItemIconColor="#2CBB54"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#000000' }}
              submitButtonColor="#2CBB54"
              submitButtonText="Select these tags"
            />
          </View>
          <View className="flex-1 pb-3">
            <Text className="text-green-500" style={{ fontSize: 24, fontWeight: "500" }}>Exclude ingredients</Text>
            <MultiSelect
              // hideTags
              items={ingredients}
              uniqueKey="id"
              // ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={onSelectedExcludeIngredients}
              selectedItems={excludedIngredients}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              // onChangeInput={ (text)=> console.log(text)}
              // altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#2CBB54"
              tagBorderColor="#2CBB54"
              tagTextColor="#2CBB54"
              selectedItemTextColor="#2CBB54"
              selectedItemIconColor="#2CBB54"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#000000' }}
              submitButtonColor="#2CBB54"
              submitButtonText="Select these tags"
            />
          </View>
          <View className="flex-1 pb-3">
            <Text className="text-green-500" style={{ fontSize: 24, fontWeight: "500" }}>Exclude cooking utensils</Text>
            <MultiSelect
              // hideTags
              items={utensils}
              uniqueKey="id"
              // ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={onSelectedExcludeUtensils}
              selectedItems={excludedUtensils}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              // onChangeInput={ (text)=> console.log(text)}
              // altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#2CBB54"
              tagBorderColor="#2CBB54"
              tagTextColor="#2CBB54"
              selectedItemTextColor="#2CBB54"
              selectedItemIconColor="#2CBB54"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#000000' }}
              submitButtonColor="#2CBB54"
              submitButtonText="Select these tags"
            />
          </View>
          <View className="flex-1 pb-8">
            <Text className="text-green-500 pb-3" style={{ fontSize: 24, fontWeight: "500" }}>Calories range</Text>
            <View className="flex-row justify-center">
              <TextInput
                style={{ paddingHorizontal: 20 }}
                className="flex-1 top-2 h-10 border-2 text-left border-green-500 rounded-full"
                onChangeText={onInputMinCal}
                value={String(minCal)}
                placeholder='Min'
                textContentType='username'
                keyboardType='number-pad'
              />
              <Text className="text-green-500 flex-1 self-center top-1 left-6 " style={{ fontSize: 30 }}> - </Text>
              <TextInput
                style={{ paddingHorizontal: 20 }}
                className="flex-1 top-2 h-10 border-2 text-left border-green-500 rounded-full"
                onChangeText={onInputMaxCal}
                value={String(maxCal)}
                placeholder='Man'
                textContentType='username'
                keyboardType='number-pad'
              />
              <Text className="text-green-500 flex-1 self-center top-2 left-5 font-semibold" style={{ fontSize: 15 }}>KCal</Text>
            </View>
          </View>
          <View className="flex-1 pb-8">
            <Text className="text-green-500 pb-3" style={{ fontSize: 24, fontWeight: "500" }}>Number of recipes</Text>
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
          <View className="flex-1 self-center">
            <Button
              className="bottom-0 h-12 w-40"
              onPress={() => navigation.navigate(RecipeRoutes.result)}
            >
              <Text className="text-center text-lg font-semibold text-white">
                See my recipes
              </Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
        </ScrollView>
        </View>
      
    </SafeAreaView>
  );
}

export default RandomRecipes;
