import { View, Text } from "react-native";
import React from "react";
import SlidingUpPanel from "rn-sliding-up-panel";
import StyledSlider from "../common/StyledSlider";
import ColorScheme from "../../constants/ColorScheme";

export default function PartyDistancePanel({
  randomDistance,
  onRandomDistanceChange,
}) {
  function handleRandomDistanceChange(distances: number[]) {
    if (distances.length > 0) onRandomDistanceChange(distances[0]);
  }

  return (
    <View className="mx-auto flex w-11/12 pt-2">
      <Text className="text-center text-lg font-semibold text-green-500">
        Distance
      </Text>
      <StyledSlider
        value={randomDistance}
        onValueChange={handleRandomDistanceChange}
        minimumValue={1}
        maximumValue={10}
        step={1}
        animateTransitions
        animationType="spring"
        minimumTrackTintColor={ColorScheme.primary}
        thumbTintColor={ColorScheme.primary}
        trackStyle="h-[2px]"
      />
      <Text className="text-center text-2xl font-semibold text-green-500">
        {randomDistance}
      </Text>
      <Text className="text-center text-green-500">km</Text>
    </View>
  );
}
