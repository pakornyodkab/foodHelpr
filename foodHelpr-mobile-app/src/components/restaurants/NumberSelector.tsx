import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  Pressable,
} from "react-native";

type NumberSelectorProp = {
  number: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const NumberSelector = ({
  number,
  onIncrease,
  onDecrease,
}: NumberSelectorProp) => {
  return (
    <View className="flex h-12 flex-row items-center justify-center">
      <Pressable
        className="mb-5 flex h-12 w-12 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
        onPress={onDecrease}
      >
        <Text className="text-center text-lg font-semibold text-white">-</Text>
      </Pressable>
      <Text className="mx-4 h-full text-center text-2xl font-semibold text-green-500 w-10">
        {number}
      </Text>
      <Pressable
        className="mb-5 flex h-12 w-12 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
        onPress={onIncrease}
      >
        <Text className="text-center text-lg font-semibold text-white">+</Text>
      </Pressable>
    </View>
  );
};

export default NumberSelector;