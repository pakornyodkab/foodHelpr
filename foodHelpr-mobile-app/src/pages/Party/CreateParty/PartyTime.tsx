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
import Button from "../../components/common/Button";
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
      {isTimePickerVisible && (
        <DateTimePicker
          value={time}
          mode={"time"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onChangeTime}
        />
      )}
    </TouchableOpacity>
  );
};

export default PartyTime;
