import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import SlidingUpPanel from "rn-sliding-up-panel";
import ColorScheme from "../../constants/ColorScheme";
import MultiSelectPanel from "../common/MultiSelectPanel";
import StyledSlider from "../common/StyledSlider";

const window = Dimensions.get("window");

type RestaurantOptionPanelProp = {
  randomDistance: number;
  onRandomDistanceChange: (newRandomDistance: number) => void;
  tags: {}[];
  selectedTags: {}[];
  onSelectedTagsChange: (newSelectedTags: {}[]) => void;
  deliveryOptions: {}[];
  selectedDeliveryOptions: {}[];
  onDeliveryOptionsChange: (newOptions: {}[]) => void;
};

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
  return (
    <View className="absolute h-full w-full">
      <SlidingUpPanel
        snappingPoints={[window.height * 0.7]}
        draggableRange={{ top: window.height * 0.7, bottom: 20 }}
        height={window.height}
        friction={0.5}
      >
        <>
          <View className="mx-auto h-5 w-14 rounded-t-lg bg-white">
            <Text className="text-center font-semibold text-green-500">
              <FontAwesome name="angle-up" size={20} />
            </Text>
          </View>
          <ScrollView className={`h-full w-full rounded-t-lg bg-white p-4`}>
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
  return (
    <View className={`mx-auto w-11/12 ${className}`}>
      <Text className="text-center text-lg font-semibold text-green-500">
        Distance
      </Text>
      <StyledSlider
        value={randomDistance}
        onValueChange={onRandomDistanceChange}
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
