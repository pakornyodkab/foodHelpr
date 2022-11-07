import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IParty from "../../models/Party";

type MyPartyPendingCardProp = {
  party: IParty;
  key?: string;
};

const MyPartyPendingCard = ({ party, key }: MyPartyPendingCardProp) => {
  return (
    <View
      key={key}
      className="mb-4 flex max-w-sm space-y-1 rounded-lg border-2 border-green-500 bg-transparent p-4 shadow-lg "
    >
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
        <View className="flex flex-row gap-1">
          {party.memberList.map((member) => (
            <View className="h-6 w-6" key={member.user_id}>
              <Image
                key={member.user_id}
                source={{
                  uri: member.profile_picture,
                }}
                className="flex-1 rounded-full object-cover"
              />
            </View>
          ))}
        </View>
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
