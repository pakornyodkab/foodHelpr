import { useState } from "react";
import { Text, View } from "react-native";
import { LatLng, Marker } from "react-native-maps";
//import RestaurantModal from "./RestaurantModal";
import { Ionicons } from "@expo/vector-icons";
import IRestaurant from "../../models/Restaurant";
import PartyModal from "./PartyListModal";
import IUser from "../../models/User";
import IParty from "../../models/Party";
import restaurant from "../../apis/restaurant";

type PartyMarkerProp = {
  restaurant: IRestaurant;
  parties: IParty[];
  // key: string;
};

const PartyMarker = ({ restaurant, parties }: PartyMarkerProp) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Marker
      // key={key}
      coordinate={{
        latitude: restaurant.coordinate.latitude,
        longitude: restaurant.coordinate.longitude,
      }}
      onPress={() => setModalVisible(true)}
    >
      <View className="flex items-center">
        <Text className="text-green-700">{restaurant.restaurantName}</Text>
        <Text className="text-green-700">
          <Ionicons name="people" size={32} />
        </Text>
      </View>
      <PartyModal
        parties={parties}
        restaurant={restaurant}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      ></PartyModal>
    </Marker>
  );
};

export default PartyMarker;
