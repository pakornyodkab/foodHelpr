import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  Image,
  View,
  TouchableOpacity,
  Modal,
  Platform,
  Pressable,
} from "react-native";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Button from "../../../components/common/Button";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import PartyCalendar from "../../../components/party/PartyCalendar";
import PartyTime from "../../../components/party/PartyTime";
import FoodFriendIndex from "../../FoodFriend";
import FoodFriendRoutes from "../../../routes/foodFriend";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { getToken } from "../../../libs/token";
import FoodFriendService from "../../../apis/foodFriend";
import { getUser } from "../../../libs/user";
import IUser from "../../../models/User";
import AgeRestrictionModal from "../../../components/party/AgeRestrictionModal";

function CreateParty({ navigation }) {
  const handleOnPressBack = () => {
    //navigation.goBack();
    navigation.navigate(FoodFriendRoutes.main);
  };

  const [openCalendar, setOpenCalender] = useState(false);
  const [partyStartDate, setPartyStartDate] = useState<Date>(null);
  const [time, setTime] = useState<Date>(new Date(Date.now()));
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [partyName, setPartyName] = useState<string>(null);
  const [maxGuests, setMaxGuests] = useState<Number>(null);
  const [ageRestriction, setAgeRestriction] = useState<Number>(null);
  const [ageRestrictionModalVisible, SetAgeRestrictionModalVisible] =
    useState<boolean>(false);
  //const [restaurant, setRestaurant] = useState<string>('Select Restaurant');
  const restaurant = useSelector((state: RootState) => state.partyReducer);
  const userRef = useRef<IUser>();

  const handleTimeChange = (time, validTime) => {
    if (!validTime) return;

    setTime(time);
  };

  const onChangeTime = (event, value) => {
    setTime(value);
    if (Platform.OS === "android") {
      setTimePickerVisible(false);
    }
  };

  const getMyUser = async () => {
    userRef.current = await getUser();
  };

  const handleAgeRestrictionModal = (status) => {
    SetAgeRestrictionModalVisible(status);
  };

  useEffect(() => {
    getMyUser();
  }, []);

  async function onCreateHostParty() {
    if (ageRestriction > userRef.current.age) {
      handleAgeRestrictionModal(true);
      return;
    }
    const createPartyData = {
      name: partyName,
      restaurant: restaurant.id,
      apptDate: new Date(
        `${partyStartDate.toISOString().substring(0, 10)}T${time
          .toISOString()
          .substring(11)}`
      ),
      ageRestriction: Number(ageRestriction),
      maxGuests: Number(maxGuests),
      ownerId: userRef.current.user_id.toString(),
    };
    try {
      const accessToken = await getToken();
      const foodFriendService = new FoodFriendService(accessToken);
      const response = await foodFriendService.CreateHostParty(createPartyData);
      console.log("Create party Successfully!!");
      navigation.navigate(FoodFriendRoutes.myParty);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    //<RestaurantContext.Provider value={{ restaurant, setRestaurant}}>
    <SafeAreaView className="relative h-full w-full bg-white">
      <AgeRestrictionModal
        visible={ageRestrictionModalVisible}
        onClose={() => {
          handleAgeRestrictionModal(false);
        }}
      />
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
          source={require("../../../../assets/CreateParty.png")}
          style={{ width: 50, height: 60, flex: 0.75, resizeMode: "contain" }}
        />
      </View>
      {/* <ScrollView className="h-full w-full "> */}
      <View>
        <View className="top-5 flex pl-5 pr-5">
          <View className="flex-1 pb-3">
            <Text
              className="text-green-500"
              style={{ fontSize: 20, fontWeight: "500" }}
            >
              Party Name
            </Text>
            <TextInput
              className="top-2 h-10 flex-1 rounded-full border-2 border-green-500 px-[20px] text-left"
              placeholder="Enter name"
              keyboardType="default"
              value={partyName}
              onChangeText={(value) => setPartyName(value)}
            />
          </View>
          <View className="top-5 flex-1 pb-3">
            <Text
              className="text-green-500"
              style={{ fontSize: 20, fontWeight: "500" }}
            >
              Party Date & Time
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
              className="items-center"
            >
              <PartyCalendar
                setOpenCalendar={setOpenCalender}
                openCalendar={openCalendar}
                partyStartDate={partyStartDate}
                setPartyStartDate={setPartyStartDate}
                isAgeModal={false}
              />
              <PartyTime
                setTimePickerVisible={setTimePickerVisible}
                isTimePickerVisible={isTimePickerVisible}
                time={time}
                onChangeTime={onChangeTime}
              />
            </View>
            <View className="top-5 flex-1 pb-3">
              <View
                className="flex-1 pb-3"
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    className="text-green-500"
                    style={{ fontSize: 20, fontWeight: "500" }}
                  >
                    Max Guests
                  </Text>
                  <TextInput
                    className="top-2 h-10 flex-1 rounded-full border-2 border-green-500 px-[20px] text-left"
                    placeholder="Select Number"
                    keyboardType="number-pad"
                    style={{ marginRight: 5, fontSize: 16 }}
                    value={maxGuests?.toString()}
                    onChangeText={(value) =>
                      setMaxGuests(
                        Number.isNaN(Number(value)) ? 0 : Number(value)
                      )
                    }
                  />
                </View>
                <View>
                  <Text
                    className="text-green-500"
                    style={{ fontSize: 20, fontWeight: "500" }}
                  >
                    Age Restrictions
                  </Text>
                  <TextInput
                    className="top-2 h-10 flex-1 rounded-full border-2 border-green-500 px-[20px] text-left"
                    placeholder="Select Number"
                    keyboardType="number-pad"
                    style={{ marginLeft: 5, fontSize: 16 }}
                    value={ageRestriction?.toString()}
                    onChangeText={(value) =>
                      setAgeRestriction(
                        Number.isNaN(Number(value)) ? 0 : Number(value)
                      )
                    }
                  />
                </View>
              </View>
            </View>
            <View
              className="top-5 h-16 flex-1 rounded-full border-2 border-green-500 px-[20px] text-left"
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                className="text-green-500"
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                {restaurant.name}
              </Text>
              <Pressable
                onPress={() =>
                  navigation.navigate(FoodFriendRoutes.createPartyMap)
                }
              >
                <Ionicons
                  className="bg-green-500"
                  name="md-arrow-forward-circle"
                  size={48}
                  color="#2CBB54"
                ></Ionicons>
              </Pressable>
            </View>
            <View
              className="top-10 flex-1 pb-3"
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                className="mb-5 flex h-12 w-32 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700 "
                onPress={() => onCreateHostParty()}
              >
                <Text className="text-center text-lg font-semibold text-white">
                  Confirm
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default CreateParty;
