import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "../common/Button";
import moment from "moment";
import IParty from "../../models/Party";
import FoodFriendService from "../../apis/foodFriend";
import { saveToken, getToken } from "../../libs/token";

type PartyCardProp = { party: IParty };

export default function PartyCard({ party }: PartyCardProp) {
  const onJoinPressedHandler = async () => {
    const accessToken = await getToken();
    const foodFriendService = new FoodFriendService(accessToken);
    await foodFriendService.GuestJoinParty({ partyId: party._id });
  };

  console.log("key", party.memberList);

  return (
    <View className="mb-4 flex max-w-sm rounded-lg border-2 border-green-500 bg-transparent p-4 shadow-lg ">
      <View className="flex-row space-x-2">
        <View className="flex-row space-x-1">
          <Ionicons name="people" size={20} />
          <Text>{`${party.memberList.length}/${party.maxGuests}`}</Text>
        </View>
        <Text>{party.name}</Text>
      </View>
      <View className="flex items-center">
        {party.memberList.map((member) => (
          <View className="h-10 w-10" key={member.user_id}>
            <Image
              key={member.user_id}
              source={{ uri: member.profile_picture }}
              className="rounded-md object-cover"
            />
          </View>
        ))}
      </View>
      <View className="flex-row items-center space-x-3">
        <Text>
          {moment(party.apptDate.toString()).format("DD MMM YYYY h:mm:ss a")}
        </Text>
        <Button
          className="rounded-lg bg-green-500 px-2 py-1 shadow-md duration-150 hover:shadow-lg focus:shadow-lg active:scale-95 active:bg-green-700 active:shadow-lg"
          onPress={onJoinPressedHandler}
        >
          <Text className="text-white">Join</Text>
        </Button>
      </View>
    </View>
  );
}
