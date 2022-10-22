import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import Button from "../../../components/common/Button";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MyPartyCard from "../../../components/party/MyPartyCard";

const MyParty = ({ navigation }) => {
  function handleOnPressBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="relative h-full w-full bg-white">
      <Image
        className="absolute -top-36"
        source={require("../../../../assets/topBanner.png")}
        style={{ height: 200, width: 400, flex: 1 }}
      />
      <View className="top-8 mx-4 mt-4 flex flex-row items-center space-x-3 pb-5">
        <Button className="h-12 w-12" onPress={handleOnPressBack}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="arrow-left" size={16} />
          </Text>
        </Button>
        <Image
          className="left-2 top-1"
          source={require("../../../../assets/MyParty.png")}
          style={{ width: 50, height: 60, flex: 0.4, resizeMode: "contain" }}
        />
      </View>
      <ScrollView className="top-5 p-5">
        <MyPartyCard navigation= { navigation }></MyPartyCard>
        <MyPartyCard navigation= { navigation }></MyPartyCard>
        <MyPartyCard navigation= { navigation }></MyPartyCard>
        <MyPartyCard navigation= { navigation }></MyPartyCard>
        <MyPartyCard navigation= { navigation }></MyPartyCard>
        <MyPartyCard navigation= { navigation }></MyPartyCard>
        <MyPartyCard navigation= { navigation }></MyPartyCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyParty;
