import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "../common/Button";
import LeaveRoomModal from "./LeaveRoomModal";
import MainRoutes from "../../routes/main";

const MyPartyPendingCard = ({ party }) => {
  return (
    <View className="mb-4 flex max-w-sm space-y-1 rounded-lg border-2 border-green-500 bg-transparent p-4 shadow-lg ">
      <View className="flex-row justify-between space-x-2">
        <View className="flex-row space-x-1">
          <Text className="text-lg font-semibold text-green-500">
            {`${party.name} (${party.memberList.length})`}
          </Text>
        </View>
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
          <View className="rounded-lg bg-blue-500 px-2 py-1 shadow-md duration-150 hover:shadow-lg focus:shadow-lg active:scale-95 active:bg-red-700 active:shadow-lg">
            <Text className="text-white">Pending</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyPartyPendingCard;
