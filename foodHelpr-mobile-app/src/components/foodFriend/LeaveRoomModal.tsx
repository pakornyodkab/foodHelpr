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
import PartyCalendar from "../../pages/Party/CreateParty/PartyCalendar";
import Button from "../common/Button";
import PartyCard from "./PartyCard";

const LeaveRoomModal = ({ isVisible, onClose }) => {
  const onDeleteRoom = () => {
    console.log("Leave|End Room");
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView} className="mb-10 flex space-y-5">
          <View className="flex-row items-center space-x-2">
            <Text className="text-red text-center">
              <Ionicons name="close" size={32} color="red" />
            </Text>

            <Text className="text-lg font-semibold text-green-500">
              Are you sure ?
            </Text>
          </View>
          <Text className="w-48 flex-wrap text-green-500">
            Do you want to leave this room ? This process cannot be undoned
          </Text>
          <View className="flex-row items-end justify-between">
            <View></View>
            <Button
              className="rounded-lg bg-green-500 px-2 py-1 shadow-md duration-150 hover:shadow-lg focus:shadow-lg active:scale-95 active:bg-green-700 active:shadow-lg"
              onPress={() => onClose()}
            >
              <Text className="text-white">Cancel</Text>
            </Button>
            <Button
              className="rounded-lg bg-red-500 px-2 py-1 shadow-md duration-150 hover:shadow-lg focus:shadow-lg active:scale-95 active:bg-red-700 active:shadow-lg"
              onPress={() => onDeleteRoom()}
            >
              <Text className="text-white">Leave Room</Text>
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

export default LeaveRoomModal;
