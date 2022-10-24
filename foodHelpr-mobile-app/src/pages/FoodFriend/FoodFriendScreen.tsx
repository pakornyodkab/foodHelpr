import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import FoodFriendRoutes from "../../routes/foodFriend";
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/common/Button";

const FoodFriendScreen = ({ navigation }) => {
  const onHandlePartyButton = () => {};

  function handleOnPressBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="relative h-full w-full bg-white pt-5">
      <Image
        className="absolute -top-36"
        source={require("../../../assets/topBanner.png")}
        style={{ height: 200, width: 400, flex: 1 }}
      />
      <View className="flex justify-center">
        <View className="mx-4 mt-4 flex flex-row items-center space-x-5">
          <Button className="h-12 w-12" onPress={handleOnPressBack}>
            <Text className="text-center font-semibold text-white">
              <FontAwesome name="arrow-left" size={16} />
            </Text>
          </Button>
          <Image
            className="left-2"
            source={require("../../../assets/FoodFriend.png")}
            style={{ width: 50, height: 60, flex: 0.5, resizeMode: "contain" }}
          />
        </View>
        <View className="m-5 flex items-center space-y-3 p-5">
          <View className="flex-row space-x-3">
            <Pressable
              className=" flex h-40 w-40 justify-center rounded-lg border-[3px] border-green-500 shadow-lg shadow-indigo-500/40 active:scale-95 active:bg-green-200"
              onPress={() => navigation.navigate(FoodFriendRoutes.createParty)}
            >
              <View className="flex items-center justify-center space-y-3">
                <Text className=" text-green-500 ">
                  <Ionicons name="create" size={40} />
                </Text>
                <Text className="text-center text-2xl font-semibold text-green-500">
                  Create Party
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="flex h-40 w-40 justify-center rounded-lg border-[3px] border-green-500 shadow-lg shadow-indigo-500/40 active:scale-95 active:bg-green-200"
              onPress={() => navigation.navigate(FoodFriendRoutes.searchParty)}
            >
              <View className="flex items-center justify-center space-y-3">
                <Text className=" text-green-500 ">
                  <Ionicons name="search" size={40} />
                </Text>
                <Text className="text-center text-2xl font-semibold text-green-500">
                  Search Party
                </Text>
              </View>
            </Pressable>
          </View>
          <View className="flex-row space-x-3">
            <Pressable
              className="flex h-40 w-40 justify-center rounded-lg border-[3px] border-green-500 shadow-lg shadow-indigo-500/40 active:scale-95 active:bg-green-200"
              onPress={() => navigation.navigate(FoodFriendRoutes.myParty)}
            >
              <View className="flex items-center justify-center space-y-3">
                <Text className=" text-green-500 ">
                  <Ionicons name="person" size={40} />
                </Text>
                <Text className="text-center text-2xl font-semibold text-green-500">
                  My Party
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="flex h-40 w-40 justify-center rounded-lg border-[3px] border-green-500 shadow-lg shadow-indigo-500/40 active:scale-95 active:bg-green-200"
              onPress={() => navigation.navigate(FoodFriendRoutes.waitingLists)}
            >
              <View className="flex items-center justify-center space-y-3">
                <Text className=" text-green-500 ">
                  <MaterialCommunityIcons name="account-clock" size={40} />
                </Text>
                <Text className="text-center text-2xl font-semibold text-green-500">
                  Waiting Lists
                </Text>
              </View>
            </Pressable>
          </View>
          {/* <View className=" top-5 flex items-center justify-center gap-1">
            <Pressable
              className="flex h-16 w-64 justify-center rounded-lg border-[2px] border-green-500 shadow-lg shadow-indigo-500/40 active:scale-95 active:bg-green-700"
              onPress={() => navigation.navigate(FoodFriendRoutes.createParty)}
            >
              <View className="relative flex h-full justify-center">
                <Text className="absolute left-4 text-green-500">
                  <Ionicons name="create" size={30} />
                </Text>
                <Text className="text-center text-2xl font-semibold text-green-500">
                  Create Party
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
              onPress={() => navigation.navigate(FoodFriendRoutes.searchParty)}
            >
              <View className="relative flex h-full justify-center">
                <Text className="absolute left-4 text-white">
                  <MaterialIcons name="search" size={30} />
                </Text>
                <Text className="text-center font-normal text-white">
                  Search Party
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
              onPress={() => navigation.navigate(FoodFriendRoutes.myParty)}
            >
              <View className="relative flex h-full justify-center">
                <Text className="absolute left-4 text-white">
                  <Ionicons name="person" size={30} />
                </Text>
                <Text className="text-center font-normal text-white">
                  My Party
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
              onPress={() => navigation.navigate(FoodFriendRoutes.waitingLists)}
            >
              <View className="relative flex h-full justify-center">
                <Text className="absolute left-4 text-white">
                  <MaterialCommunityIcons name="account-clock" size={30} />
                </Text>
                <Text className="text-center font-normal text-white">
                  Waiting Lists
                </Text>
              </View>
            </Pressable>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
    // <SafeAreaView>
    //   <View
    //     style={{
    //       flex: 1,
    //       alignItems: "center",
    //       justifyContent: "center",
    //       marginTop: 30,
    //     }}
    //     className="bg-red-500"
    //   >
    //     <View className="flex bg-slate-600">
    //       <View className="flex items-center justify-center gap-1">
    //         <Pressable
    //           className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
    //           onPress={() => navigation.navigate(FoodFriendRoutes.createParty)}
    //         >
    //           <View className="relative flex h-full justify-center">
    //             <Text className="absolute left-4 text-white">
    //               <MaterialIcons name="restaurant" size={24} />
    //             </Text>
    //             <Text className="text-center font-normal text-white">
    //               Create Party
    //             </Text>
    //           </View>
    //         </Pressable>
    //         <Pressable
    //           className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
    //           onPress={() => navigation.navigate(FoodFriendRoutes.searchParty)}
    //         >
    //           <View className="relative flex h-full justify-center">
    //             <Text className="absolute left-4 text-white">
    //               <MaterialIcons name="microwave" size={24} />
    //             </Text>
    //             <Text className="text-center font-normal text-white">
    //               Search Party
    //             </Text>
    //           </View>
    //         </Pressable>
    //         <Pressable
    //           className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
    //           onPress={() => navigation.navigate(FoodFriendRoutes.myParty)}
    //         >
    //           <View className="relative flex h-full justify-center">
    //             <Text className="absolute left-4 text-white">
    //               <MaterialIcons name="people" size={24} />
    //             </Text>
    //             <Text className="text-center font-normal text-white">
    //               My Party
    //             </Text>
    //           </View>
    //         </Pressable>
    //       </View>
    //     </View>
    //   </View>
    // </SafeAreaView>
  );
};

export default FoodFriendScreen;
