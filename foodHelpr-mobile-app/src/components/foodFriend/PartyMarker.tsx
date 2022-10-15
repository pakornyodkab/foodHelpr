import { useState } from "react";
import { Text, View } from "react-native";
import { LatLng, Marker } from "react-native-maps";
//import RestaurantModal from "./RestaurantModal";
import { Ionicons } from "@expo/vector-icons";
import { IMember } from "../../models/Party";
import IRestaurant from "../../models/Restaurant";
import PartyModal from "./PartyModal";

type PartyMarkerProp = {
  partyName: string;
  restaurant: IRestaurant;
  apptDate: string;
  memberList: IMember[];
  ageRestriction: number;
  maxGuests: number;
  ownerId: string;
};

const PartyMarker = ({
  partyName,
  restaurant,
  apptDate,
  memberList,
  ageRestriction,
  maxGuests,
  ownerId
}: PartyMarkerProp) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Marker coordinate={restaurant.coordinate} onPress={() => setModalVisible(true)}>
      <View className="flex items-center">
        <Text className="text-green-700">{restaurant.restaurantName}</Text>
        <Text className="text-green-700">
          <Ionicons name='people' size={32} />
        </Text>
      </View>
      <PartyModal isVisible={modalVisible} onClose={() => setModalVisible(false)}></PartyModal>
    </Marker>
  );
};

export default PartyMarker;
