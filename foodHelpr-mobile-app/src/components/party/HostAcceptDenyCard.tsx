import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "../common/Button";
import LeaveRoomModal from "./LeaveRoomModal";
import MainRoutes from "../../routes/main";
import { getToken } from "../../libs/token";
import FoodFriendService from "../../apis/foodFriend";
import IParty from "../../models/Party";
import IUser from "../../models/User";

type HostAcceptDenyCardProp = {
  party: IParty;
  guest: IUser;
  onAction: () => void;
};

const HostAcceptDenyCard = ({
  party,
  guest,
  onAction,
}: HostAcceptDenyCardProp) => {
  const handleAction = async (action: "accept" | "decline") => {
    try {
      const accessToken = await getToken();
      const foodFriendService = new FoodFriendService(accessToken);
      await foodFriendService.HostPartyAction({
        partyId: party._id,
        action: action,
        memberId: guest.user_id.toString(),
      });
      onAction();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View className="mb-4 flex max-w-sm space-y-1 rounded-lg border-2 border-green-500 bg-transparent p-4 shadow-lg ">
      <View className="flex-row justify-between space-x-2">
        <View className="flex-row space-x-1">
          <Text className="text-lg font-semibold text-green-500">
            {`${guest.firstname} ${guest.lastname} want to join ${party.name}`}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center justify-end space-x-3">
        <View className="flex-row">
          <Button
            className="rounded-lg bg-green-500 px-2 py-1 shadow-md duration-150 hover:shadow-lg focus:shadow-lg active:scale-95 active:bg-red-700 active:shadow-lg"
            onPress={async () => await handleAction("accept")}
          >
            <Text className="text-white">Accept</Text>
          </Button>
        </View>
        <View className="flex-row">
          <Button
            className="rounded-lg bg-red-500 px-2 py-1 shadow-md duration-150 hover:shadow-lg focus:shadow-lg active:scale-95 active:bg-red-700 active:shadow-lg"
            onPress={async () => await handleAction("decline")}
          >
            <Text className="text-white">Deny</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default HostAcceptDenyCard;
