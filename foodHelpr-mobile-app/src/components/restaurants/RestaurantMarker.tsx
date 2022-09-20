import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { LatLng, Marker } from "react-native-maps";
import RestaurantModal from "./RestaurantModal";
import { Ionicons } from "@expo/vector-icons";

type RestaurantMarkerProp = {
  name?: string;
  coordinate: LatLng;
};

const RestauratMarker = ({ name = "", coordinate }: RestaurantMarkerProp) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Marker coordinate={coordinate} onPress={() => setModalVisible(true)}>
      <View className="flex items-center">
      <Text className="text-green-700">{name}</Text>
      <Text className="text-green-700">
        <Ionicons name="restaurant" size={32} />
      </Text>
      </View>
      <RestaurantModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Marker>
  );
};

export default RestauratMarker;
