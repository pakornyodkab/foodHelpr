import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { getToken } from "../../libs/token";
import IParty from "../../models/Party";
import IRestaurant from "../../models/Restaurant";
import Button from "../common/Button";
import PartyCard from "./PartyCard";

type PartyModalType = {
  isVisible: boolean;
  onClose: () => void;
  parties: IParty[];
  restaurant: IRestaurant;
};

const PartyModal = ({
  isVisible,
  onClose,
  parties,
  restaurant,
}: PartyModalType) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView} className="mb-10 flex space-y-5">
          <View className="flex-col items-center space-x-2">
            {/* Restaurant Image */}
            <View className="mb-2 h-36 w-64">
              <Image
                className="flex-1 rounded-xl object-cover"
                source={{ uri: restaurant.imageUrls[0] }}
              />
            </View>
            <View className="flex w-full">
              <Text className="text-center text-lg font-semibold text-green-500">
                {restaurant.restaurantName}
              </Text>

              <Text className="text-green-500">{restaurant.address}</Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="rounded-lg border-2 border-gray-200 p-3"
          >
            {parties.map((party) => (
              <PartyCard key={party._id} party={party}/>
            ))}
          </ScrollView>
          <View className="mt-3">
            <Button className="mt-4 h-10 w-10" onPress={() => onClose()}>
              <Text className="text-center text-white">
                <Ionicons name="close" size={32} />
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PartyModal;
