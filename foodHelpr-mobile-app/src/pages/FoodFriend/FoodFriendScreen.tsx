import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import FoodFriendRoutes from "../../routes/foodFriend";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
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
      <View className="flex">
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
        <View className="flex items-center">
          <View className=" top-5 flex items-center justify-center gap-1">
            <Pressable
              className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
              onPress={() => navigation.navigate(FoodFriendRoutes.createParty)}
            >
              <View className="relative flex h-full justify-center">
                <Text className="absolute left-4 text-white">
                  <MaterialIcons name="restaurant" size={24} />
                </Text>
                <Text className="text-center font-normal text-white">
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
                  <MaterialIcons name="microwave" size={24} />
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
                  <MaterialIcons name="people" size={24} />
                </Text>
                <Text className="text-center font-normal text-white">
                  My Party
                </Text>
              </View>
            </Pressable>
          </View>
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
