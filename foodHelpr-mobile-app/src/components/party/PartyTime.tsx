import React, { useState } from "react";
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
} from "react-native";

import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Button from "../common/Button";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

const PartyTime = ({
  setTimePickerVisible,
  isTimePickerVisible,
  time,
  onChangeTime,
}) => {
  return (
    <TouchableOpacity
      className="top-2 h-10 flex-1 justify-center rounded-full border-2 border-green-500 px-[20px] text-left"
      onPress={() => {
        setTimePickerVisible(true);
      }}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 5,
      }}
    >
      <TextInput
        placeholder="Pick Time"
        editable={false}
        style={{
          color: "black",
          fontSize: 14,
          fontWeight: "500",
        }}
        value={time ? moment(time.toString()).format("h:mm A") : null}
      ></TextInput>
      <Ionicons name="time-sharp" size={32} color="#2CBB54" />
      {isTimePickerVisible && Platform.OS === "android" && (
        <DateTimePicker
          value={time}
          mode={"time"}
          display={"default"}
          is24Hour={true}
          onChange={onChangeTime}
        />
      )}
      {Platform.OS === "ios" && (
        <Modal visible={isTimePickerVisible} transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DateTimePicker
                value={time}
                mode={"time"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                is24Hour={true}
                onChange={onChangeTime}
                textColor="black"
                style={
                  Platform.OS == "ios"
                    ? { width: 320, backgroundColor: "white" }
                    : {}
                }
              />
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Button
                  className="items-center bg-green-500 "
                  onPress={() => setTimePickerVisible(false)}
                  style={{
                    borderRadius: 15,
                    padding: 10,
                    elevation: 2,
                    width: 70,
                  }}
                >
                  <Text>OK</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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

export default PartyTime;
