import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SectionedMultiSelect, {
  Colors as MultiSelectColors,
} from "react-native-sectioned-multi-select";
import ColorScheme from "../../constants/Color";

const MultiSelectPanel = React.memo(
  <T extends unknown>({
    title,
    selectText,
    items,
    selectedItems,
    onSelectedItemsChange,
    searchPlaceholderText,
  }: {
    title: string;
    selectText?: string;
    items: T[];
    selectedItems: T[];
    onSelectedItemsChange: (newOptions: T[]) => void;
    searchPlaceholderText?: string;
  }) => {
    return (
      <View className="my-2 flex-1">
        <Text className="font-semibold text-green-500">{title}</Text>
        <SectionedMultiSelect
          uniqueKey="_id"
          displayKey="name"
          selectText={selectText}
          fixedHeight
          items={items}
          selectedItems={selectedItems}
          onSelectedItemsChange={onSelectedItemsChange}
          IconRenderer={MaterialIcons}
          showDropDowns
          styles={styles}
          colors={colors}
          searchPlaceholderText={searchPlaceholderText}
        />
      </View>
    );
  }
);

const colors: MultiSelectColors = {
  primary: ColorScheme.primary,
  chipColor: ColorScheme.primary,
};

const styles = StyleSheet.create({
  selectToggle: {
    marginVertical: 4,
    marginHorizontal: 4,
    borderColor: ColorScheme.primary,
    borderWidth: 1,
    borderRadius: 90,
    paddingHorizontal: 16,
    paddingTop: 4,
    height: 36,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontWeight: "400",
    fontSize: 16,
    // fontFamily: "Inter_400Regular"
  },
});

export default MultiSelectPanel;
