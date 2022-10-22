import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MyPartyCard from "../../../components/party/MyPartyCard";
import FoodFriendService from "../../../apis/foodFriend";
import { getToken } from "../../../libs/token";
import IParty from "../../../models/Party";
import MyPartyPendingCard from "../../../components/party/MyPartyPendingCard";
import HostAcceptDenyCard from "../../../components/party/HostAcceptDenyCard";

const MyParty = ({ navigation }) => {
  const [partyList, setPartyList] = useState<IParty[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleOnPressBack() {
    navigation.goBack();
  }

  async function getMyPartyList() {
    setIsLoading(true);
    try {
      const accessToken = await getToken();
      const foodFriendService = new FoodFriendService(accessToken);
      const res = await foodFriendService.GetMyParty();
      const partiesData: IParty[] = res.data.map((partyRes) => {
        const { restaurant, ...rest } = partyRes;

        return {
          ...rest,
          restaurant: {
            _id: restaurant._id,
            restaurantName: restaurant.name,
            tags: restaurant.tag,
            imageUrls: restaurant.restaurantPictureLink,
            rating: restaurant.rating,
            recommendedDishes: restaurant.recommendedDish,
            address: restaurant.address,
            coordinate: {
              latitude: restaurant.coordinate.Latitude,
              longitude: restaurant.coordinate.Longitude,
            },
            deliveryInfo: restaurant.deliveryInfo,
          },
        };
      });

      setPartyList(partiesData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getMyPartyList();
  }, []);

  function refreshMyPartyCard() {}

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
      {isLoading ? (
        <View className="absolute -z-10 flex h-full w-full items-center justify-center">
          <ActivityIndicator size="large" color="rgb(34, 197, 94)" />
        </View>
      ) : partyList.length === 0 ? (
        <View className="absolute -z-10 flex h-full w-full items-center justify-center">
          <Text className="text-xl font-semibold text-green-500/70">
            {"No party waiting :)"}
          </Text>
        </View>
      ) : (
        <ScrollView className="top-5 p-5">
          {partyList.map((party) => {
            return (
              //<MyPartyPendingCard party={party} />
              <MyPartyCard navigation={navigation} party={party}></MyPartyCard>
              //<HostAcceptDenyCard partyName={party.name} guestName="test" />
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MyParty;
