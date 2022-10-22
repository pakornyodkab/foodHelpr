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

const PartyCalendar = ({
  setOpenCalendar,
  openCalendar,
  partyStartDate,
  setPartyStartDate,
}) => {
  return (
    <TouchableOpacity
      className="top-2 h-10 flex-row justify-center space-x-2 rounded-full border-2  border-green-500 px-[20px] text-left"
      onPress={() => {
        setOpenCalendar(!openCalendar);
      }}
    >
      <TextInput
        placeholder="Pick Date"
        editable={false}
        style={{
          fontSize: 14,
          fontWeight: "500",
          color: "black",
        }}
        value={
          partyStartDate
            ? moment(partyStartDate.toString()).format("DD MMM YYYY")
            : null
        }
      ></TextInput>
      <Ionicons name="calendar-sharp" size={30} color="#2CBB54" />
      <Modal animationType="slide" visible={openCalendar}>
        <View className="h-fit">
          <CalendarPicker
            onDateChange={setPartyStartDate}
            disabledDates={(date) => {
              let yesterday = moment().subtract(1, "days");
              return date <= yesterday;
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="close-circle"
                size={32}
                color="red"
                onPress={() => {
                  setPartyStartDate(null);
                  setOpenCalendar(false);
                }}
              />
              <Text>Cancel</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="md-checkmark-circle"
                size={32}
                color="#2CBB54"
                onPress={() => setOpenCalendar(false)}
              />
              <Text>Confirm</Text>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default PartyCalendar;
