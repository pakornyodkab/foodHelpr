import {
  View,
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MyPartyPendingCard from "../../../components/party/MyPartyPendingCard";
import { getToken } from "../../../libs/token";
import FoodFriendService from "../../../apis/foodFriend";
import IParty from "../../../models/Party";
import { getUser } from "../../../libs/user";
import HostAcceptDenyCard from "../../../components/party/HostAcceptDenyCard";
import FoodFriendRoutes from "../../../routes/foodFriend";

const WaitingList = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredPendingParty, setFilteredPendingParty] = useState<IParty[]>(
    []
  );
  const [filteredHostParty, setFilteredHostParty] = useState<IParty[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [color, changeColor] = useState("red");

  const handleOnPressBack = () => {
    //navigation.goBack();
    navigation.navigate(FoodFriendRoutes.main);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getWaitingList();
    setRefreshing(false);
  };

  useEffect(() => {
    getWaitingList();
  }, []);

  async function getWaitingList() {
    setIsLoading(true);
    try {
      const user = await getUser();
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

      const pendingParty = partiesData.filter((party) => {
        return party.pendingMemberList.some(
          (member) => member.user_id === user.user_id
        );
      });

      setFilteredPendingParty(pendingParty);

      const hostParty = partiesData.filter((party) => {
        return party.ownerId === user.user_id.toString();
      });

      setFilteredHostParty(hostParty);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteHostAcceptDenyPartyCard = async () => {
    await getWaitingList();
  };

  return (
    <SafeAreaView className="relative h-full w-full bg-white">
      <Image
        className="absolute -top-36"
        source={require("../../../../assets/topBanner.png")}
        style={{ height: 200, width: 400, flex: 1 }}
      />
      <View className="top-8 mx-4 mt-4 flex flex-row items-center pb-5">
        <Button className="h-12 w-12" onPress={handleOnPressBack}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="arrow-left" size={16} />
          </Text>
        </Button>
        <Image
          className="left-2 top-1"
          source={require("../../../../assets/WaitingLists.png")}
          style={{ width: 50, height: 60, flex: 0.75, resizeMode: "contain" }}
        />
      </View>
      {isLoading ? (
        <View className="absolute -z-10 flex h-full w-full items-center justify-center">
          <ActivityIndicator size="large" color="rgb(34, 197, 94)" />
        </View>
      ) : filteredHostParty.map((party) => party.pendingMemberList).flat()
          .length === 0 && filteredPendingParty.length === 0 ? (
        <View className="absolute -z-10 flex h-full w-full items-center justify-center">
          <Text className="text-xl font-semibold text-green-500/70">
            {"No party waiting :)"}
          </Text>
        </View>
      ) : (
        <ScrollView
          className="top-5 p-5"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredHostParty.map((party) =>
            party.pendingMemberList
              .map((user) => (
                <HostAcceptDenyCard
                  key={user.user_id}
                  party={party}
                  guest={user}
                  onAction={deleteHostAcceptDenyPartyCard}
                />
              ))
              .flat()
          )}
          {filteredPendingParty.map((party) => {
            return <MyPartyPendingCard party={party} />;
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default WaitingList;
