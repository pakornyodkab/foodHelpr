import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image, Modal, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import Button from "../common/Button";

type RestaurantModalProp = {
  isVisible: boolean;
  onClose: () => void;
  restaurantName: string;
  tags: string[];
  imageUrls: string[];
  rating: number;
  recommendedDishes: string[];
  address: string;
  // orderUrls: string[]
};

const RestaurantModal = ({
  isVisible,
  onClose,
  restaurantName,
  tags,
  imageUrls,
  rating,
  recommendedDishes,
  address,
}: RestaurantModalProp) => {
  function renderRestaurantImage({ item, index }) {
    console.log(item, index);
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
          {/* <Image
            source={{
              uri: "https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg",
            }}
            className="h-48 w-full"
            resizeMode="contain"
          /> */}
          <GestureHandlerRootView className="flex-1">
            <Carousel
              loop
              // autoPlay
              pagingEnabled
              snapEnabled
              data={imageUrls}
              renderItem={renderRestaurantImage}
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
            {restaurantName}
          </Text>
          <Text>{tags.join(", ")}</Text>
          <View className="flex flex-row items-center justify-center gap-1">
            <Text className="text-2xl font-semibold text-green-500">
              {rating.toFixed(1)}
            </Text>
            <Text className="text-green-500">
              <AntDesign name="staro" size={20} />
            </Text>
          </View>
          <View className="w-full px-2">
            <Text className="font-semibold text-green-500">
              Recommended Dish:
            </Text>
            {recommendedDishes.map((dish, idx) => (
              <Text className="ml-2" key={idx}>
                {idx + 1}. {dish}
              </Text>
            ))}
          </View>
          <View className="w-full px-2">
            <Text className="font-semibold text-green-500">Address:</Text>
            <Text className="ml-2">{address}</Text>
          </View>

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

export default RestaurantModal;
