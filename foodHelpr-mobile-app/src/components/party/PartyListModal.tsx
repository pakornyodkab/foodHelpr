import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { getToken } from "../../libs/token";
import Button from "../common/Button";
import PartyCard from "./PartyCard";

const PartyModal = ({ isVisible, onClose }) => {

  const [partyList,setPartyList] = useState([])

  // async function getAllPartyCard() {
  //   try {
  //     const accessToken = await getToken();
  //     const response = await RecipeService.GetRandomRecipe(accessToken, randRecipeFilterDetail);
  //     setRecipeList(response.data)
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // }



  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView} className="mb-10 flex space-y-5">
          <View className="flex-row items-center space-x-2">
            {/* Restaurant Image */}
            <Image
              source={require("../../../assets/test-restaurant-logo.png")}
            />
            <View className="flex">
              <Text className="text-lg font-semibold text-green-500">
                McDonald Paragon{" "}
              </Text>

              <Text className="w-48 flex-wrap text-green-500">
                889 Rama I Rd Pathumwan, Bangkok, 10330
              </Text>
            </View>
          </View>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className="rounded-lg border-2 border-gray-200 p-3"
          >
            {/* {
              for (let index = 0; index < 7; index++) {
                <PartyCard></PartyCard>
              }
              } */}
            {/* {
              false ? 
              <View>
                <Text>Not found !!!</Text>
              </View>
              :
              partyList.map((partyCard) => {
                return (
                  <View>
                <PartyCard></PartyCard>
                </View>
                )
              })
            
            } */}
            <PartyCard></PartyCard>
                <PartyCard></PartyCard>
                <PartyCard></PartyCard>
                <PartyCard></PartyCard>
                <PartyCard></PartyCard>
            
          </ScrollView>
          <View className="mt-3">
            <Button className="mt-4 h-10 w-10" onPress={() => onClose()}>
              <Text className="text-center text-white">
                <Ionicons name="close" size={32} />
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default PartyModal;
