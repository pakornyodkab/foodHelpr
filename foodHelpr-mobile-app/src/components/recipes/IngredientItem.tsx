import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import IIngredient from "../../models/Ingredient";
import Button from "../common/Button";
import IngredientModal from "./IngredientModal";

export type IngredientItemProp = {
  ingredient: IIngredient;
};

function IngredientItem({ ingredient }: IngredientItemProp) {
  const [showModal, setShowModal] = useState<boolean>(false);

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <View className="my-2 ml-2 flex flex-row items-center">
        <Button className="h-8 w-8" onPress={handleOpenModal}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome5 name="angle-right" size={20} />
          </Text>
        </Button>
        <Text
          className="ml-2 text-base font-semibold"
          key={ingredient.ingredient_id}
        >
          {ingredient.quantity} {ingredient.unit} {ingredient.name}
        </Text>
      </View>
      <IngredientModal
        ingredient={ingredient}
        isVisible={showModal}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default IngredientItem;
