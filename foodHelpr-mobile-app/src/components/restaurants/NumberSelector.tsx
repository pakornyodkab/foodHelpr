import { AntDesign } from "@expo/vector-icons";
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
  canIncrease?: boolean;
  canDecrease?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
};

const NumberSelector = ({
  number,
  canIncrease = true,
  canDecrease = true,
  onIncrease,
  onDecrease,
}: NumberSelectorProp) => {
  return (
    <View className="my-1 flex flex-row items-center justify-center">
      <Pressable className="active:scale-95" onPress={onDecrease}>
        <Text className={`h-8 w-8 text-center font-semibold ${canDecrease ? "text-green-500" : "text-slate-400/50"}`}>
          <AntDesign name="minuscircleo" size={32} />
        </Text>
      </Pressable>
      <Text className="mx-4 w-10 text-center text-2xl font-semibold text-green-500">
        {number}
      </Text>
      <Pressable className="active:scale-95" onPress={onIncrease}>
        <Text className={`h-8 w-8 text-center font-semibold ${canIncrease ? "text-green-500" : "text-slate-400/50"}`}>
          <AntDesign name="pluscircleo" size={32} />
        </Text>
      </Pressable>
    </View>
  );
};

export default NumberSelector;
