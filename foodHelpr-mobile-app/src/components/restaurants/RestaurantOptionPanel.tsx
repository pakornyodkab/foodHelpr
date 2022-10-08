import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, ScrollView, Text, View } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import ColorScheme from "../../constants/ColorScheme";
import MultiSelectPanel from "../common/MultiSelectPanel";
import StyledSlider from "../common/StyledSlider";

const window = Dimensions.get("window");

type RestaurantOptionPanelProp = {
  randomDistance: number;
  onRandomDistanceChange: (newRandomDistance: number) => void;
  tags: {
    name: string;
  }[];
  selectedTags: {}[];
  onSelectedTagsChange: (newSelectedTags: {}[]) => void;
  deliveryOptions: {
    name: string;
  }[];
  selectedDeliveryOptions: {}[];
  onDeliveryOptionsChange: (newOptions: {}[]) => void;
};

const MIN_PANEL_HEIGHT = 20;
const MAX_PANEL_HEIGHT = Math.round(window.height * 0.7);

function RestaurantOptionPanel({
  randomDistance,
  onRandomDistanceChange,
  tags,
  selectedTags,
  onSelectedTagsChange,
  deliveryOptions,
  selectedDeliveryOptions,
  onDeliveryOptionsChange,
}: RestaurantOptionPanelProp) {
  const panelAnimatedValue = useRef<Animated.Value>(new Animated.Value(0));

  return (
    <View className="absolute h-full w-full">
      <SlidingUpPanel
        snappingPoints={[MAX_PANEL_HEIGHT]}
        draggableRange={{ top: MAX_PANEL_HEIGHT, bottom: MIN_PANEL_HEIGHT }}
        height={window.height}
        friction={0.5}
        animatedValue={panelAnimatedValue?.current}
      >
        <>
          <View className="mx-auto h-5 w-14 rounded-t-lg bg-white">
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: panelAnimatedValue?.current?.interpolate({
                      inputRange: [MIN_PANEL_HEIGHT, MAX_PANEL_HEIGHT],
                      outputRange: ["0deg", "180deg"], // 0 : 150, 0.5 : 75, 1 : 0
                    }),
                  },
                ],
              }}
            >
              <Text className="text-center font-semibold text-green-500">
                <FontAwesome name="angle-up" size={20} />
              </Text>
            </Animated.View>
          </View>
          <ScrollView className="h-full w-full rounded-t-lg bg-white p-4">
            <DistancePanel
              randomDistance={randomDistance}
              onRandomDistanceChange={onRandomDistanceChange}
            />
            <MultiSelectPanel
              title="Tags"
              searchPlaceholderText="Search tags..."
              selectText="Select tags"
              items={tags}
              selectedItems={selectedTags}
              onSelectedItemsChange={onSelectedTagsChange}
            />
            <MultiSelectPanel
              title="Delivery Options"
              searchPlaceholderText="Search delivery options..."
              selectText="Select delivery options"
              items={deliveryOptions}
              selectedItems={selectedDeliveryOptions}
              onSelectedItemsChange={onDeliveryOptionsChange}
            />
          </ScrollView>
        </>
      </SlidingUpPanel>
    </View>
  );
}

const DistancePanel = ({
  className,
  randomDistance,
  onRandomDistanceChange,
}: {
  className?: string;
  randomDistance: number;
  onRandomDistanceChange: (newRandomDistance: number) => void;
}) => {
  function handleRandomDistanceChange(distances: number[]) {
    if (distances.length > 0) onRandomDistanceChange(distances[0]);
  }

  return (
    <View className={`mx-auto w-11/12 ${className}`}>
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
};

export default RestaurantOptionPanel;
