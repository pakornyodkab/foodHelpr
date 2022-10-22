import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "../common/Button";
import LeaveRoomModal from "./LeaveRoomModal";
import MainRoutes from "../../routes/main";

const MyPartyCard = ({ navigation, party }) => {
  const [modalVisible, setModalVisible] = useState(false);

  function handleChatPress() {
    // const props = {
    //   party: {
    //     _id: "1",
    //     name: "Let's Party",
    //     restaurant: "",
    //     memberList: [
    //       {
    //         user_id: 1,
    //         name: "Anthony",
    //       },
    //       {
    //         user_id: 2,
    //         name: "Bryan",
    //       },
    //       {
    //         user_id: 3,
    //         name: "Yod",
    //       },
    //       {
    //         user_id: 16,
    //         name: "Aof",
    //       },
    //     ],
    //   },
    // };
    navigation.navigate(MainRoutes.chat, { party: party });
  }

  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <View className="mb-4 flex max-w-sm space-y-1 rounded-lg border-2 border-green-500 bg-transparent p-4 shadow-lg ">
      <View className="flex-row justify-between space-x-2">
        <View className="flex-row space-x-1">
          <Text className="text-lg font-semibold text-green-500">
            {`${party.name} (${party.memberList.length})`}
          </Text>
        </View>
        <Ionicons name="key" size={20} />
      </View>

      <View className="flex-row items-center space-x-2">
        <Ionicons name="restaurant" size={20} color="#2CBB54" />
        <Text className="font-medium text-green-500">
          {party.restaurant.restaurantName}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Image
          source={require("../../../assets/member.png")}
          style={{ height: 20 }}
          className=" rounded-md"
        />
        <View className="flex-row">
          <Button
            className="rounded-lg bg-green-500 px-2 py-1 shadow-md duration-150 hover:shadow-lg focus:shadow-lg active:scale-95 active:bg-green-700 active:shadow-lg"
            onPress={() => handleChatPress()}
          >
            <Text className="text-white">Chat</Text>
          </Button>
          <Button
            className="rounded-lg bg-red-500 px-2 py-1 shadow-md duration-150 hover:shadow-lg focus:shadow-lg active:scale-95 active:bg-red-700 active:shadow-lg"
            onPress={() => setModalVisible(true)}
          >
            <Text className="text-white">End Room</Text>
          </Button>
        </View>
      </View>
      <LeaveRoomModal
        isVisible={modalVisible}
        onClose={onClose}
      ></LeaveRoomModal>
    </View>
  );
};

export default MyPartyCard;
