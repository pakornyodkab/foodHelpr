import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "../common/Button";
import LeaveRoomModal from "./LeaveRoomModal";
import MainRoutes from "../../routes/main";
import { getUser } from "../../libs/user";

const MyPartyCard = ({ navigation, party, refreshRoom }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  function handleChatPress() {
    navigation.navigate(MainRoutes.chat, { party: party });
  }

  useEffect(() => {
    checkOwnerParty();
  }, []);

  const onClose = () => {
    setModalVisible(false);
  };

  const checkOwnerParty = async () => {
    const user = await getUser();
    setIsOwner(party.ownerId === user.user_id.toString());
  };

  return (
    <View className="mb-4 flex max-w-sm space-y-1 rounded-lg border-2 border-green-500 bg-transparent p-4 shadow-lg ">
      <View className="flex-row justify-between space-x-2">
        <View className="flex-row space-x-1">
          <Text className="text-lg font-semibold text-green-500">
            {`${party.name} (${party.memberList.length})`}
          </Text>
        </View>
        {isOwner ? <Ionicons name="key" size={20} color="#2CBB54" /> : null}
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
            <Text className="text-white">
              {isOwner ? "End Room" : "Leave Room"}
            </Text>
          </Button>
        </View>
      </View>
      <LeaveRoomModal
        isVisible={modalVisible}
        onClose={onClose}
        partyId={party._id}
        isOwner={isOwner}
        refreshRoom={refreshRoom}
      ></LeaveRoomModal>
    </View>
  );
};

export default MyPartyCard;
