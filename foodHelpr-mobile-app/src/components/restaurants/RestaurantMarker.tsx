import { useState } from "react";
import { Text, View } from "react-native";
import { LatLng, Marker } from "react-native-maps";
import RestaurantModal from "./RestaurantModal";
import { Ionicons } from "@expo/vector-icons";

type RestaurantMarkerProp = {
  restaurantName: string;
  tags: string[];
  imageUrls: string[];
  rating: number;
  recommendedDishes: string[];
  address: string;
  coordinate: LatLng;
  deliveryInfo: {
    _id: string;
    platform: string;
    link: string;
  }[];
};

const RestaurantMarker = ({
  restaurantName,
  tags,
  imageUrls,
  rating,
  recommendedDishes,
  address,
  coordinate,
  deliveryInfo,
}: RestaurantMarkerProp) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Marker coordinate={coordinate} onPress={() => setModalVisible(true)}>
      <View className="flex items-center">
        <Text className="text-green-700">{restaurantName}</Text>
        <Text className="text-green-700">
          <Ionicons name="restaurant" size={32} />
        </Text>
      </View>
      <RestaurantModal
        restaurantName={restaurantName}
        tags={tags}
        imageUrls={imageUrls}
        rating={rating}
        recommendedDishes={recommendedDishes}
        address={address}
        deliveryInfo={deliveryInfo}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Marker>
  );
};

export default RestaurantMarker;
