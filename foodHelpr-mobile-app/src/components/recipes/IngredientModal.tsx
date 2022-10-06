import { Ionicons } from "@expo/vector-icons";
import { Image, Modal, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import Button from "../common/Button";
import * as Linking from "expo-linking";
import IIngredient from "../../models/Ingredient";

type IngredientModalProp = {
  ingredient: IIngredient;
  isVisible: boolean;
  onClose: () => void;
};

const IngredientModal = ({
  ingredient,
  isVisible,
  onClose,
}: IngredientModalProp) => {
  function renderIngredientImage({ item, index }) {
    return (
      <Image
        key={index}
        source={{ uri: item }}
        className="h-48 w-full"
        resizeMode="contain"
      />
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}
    >
      <View className="flex h-screen w-screen items-center justify-center">
        <View className="flex h-fit w-10/12 items-center rounded-xl border-[1px] border-green-500 bg-white p-4">
          <GestureHandlerRootView className="flex-1">
            <Carousel
              loop
              pagingEnabled
              snapEnabled
              data={ingredient.picture_url}
              renderItem={renderIngredientImage}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
              }}
              width={280}
              height={200}
            />
          </GestureHandlerRootView>
          <Text className="text-2xl font-semibold text-green-500">
            {ingredient.name}
          </Text>
          
          {ingredient.delivery_info.map((info, idx) => (
            <Button
              key={idx}
              className="mt-4 h-10 w-24"
              onPress={() => Linking.openURL(info.url)}
            >
              <Text className="text-center text-white">{info.delivery_type}</Text>
            </Button>
          ))}

          <Button className="mt-4 h-10 w-10" onPress={() => onClose()}>
            <Text className="text-center text-white">
              <Ionicons name="close" size={32} />
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default IngredientModal;
