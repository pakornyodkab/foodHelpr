import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { Platform, View, Text } from "react-native";

const Notification = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState({});

  useEffect(() => {
    console.log("Run Use Effect In Notification");
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(_handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      _handleNotificationResponse
    );
  }, []);

  const _handleNotification = (notification) => {
    setNotification(notification);
  };

  const _handleNotificationResponse = (response) => {
    console.log(response);
  };

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    setExpoPushToken(token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Data: {JSON.stringify(notification)}</Text>
      </View>
    </View>
  );
};

export default Notification;
