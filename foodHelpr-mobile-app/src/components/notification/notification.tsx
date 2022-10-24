import React, { useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { Platform, View, Text } from "react-native";
import MainRoutes from "../../routes/main";
import { useNavigation } from "@react-navigation/native";
import FoodFriendRoutes from "../../routes/foodFriend";

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
  const notificationListener = useRef(null);
  const responseListener = useRef(null);
  const navigation = useNavigation();

  function navigate(name, params = {}) {
    navigation.navigate(name as never, params as never);
  }

  useEffect(() => {
    console.log("Run Use Effect In Notification");
    registerForPushNotificationsAsync();
    notificationListener.current =
      Notifications.addNotificationReceivedListener(_handleNotification);
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        _handleNotificationResponse
      );
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const _handleNotification = (notification) => {
    setNotification(notification);
    console.log("Handle Noti");
    if (notification.origin === "selected") {
      console.log("Handle Noti in If");
      navigate(MainRoutes.home);
    }
  };

  //TODO: noti when party go boom
  const _handleNotificationResponse = (response) => {
    const { action } = response.notification.request.content.data;
    switch (action) {
      case "accept":
        navigate(MainRoutes.foodFriend, {
          screen: FoodFriendRoutes.myParty,
        });
        break;
      case "reject":
        navigate(MainRoutes.foodFriend, {
          screen: FoodFriendRoutes.waitingLists,
        });
        break;
      case "leave":
        navigate(MainRoutes.foodFriend, {
          screen: FoodFriendRoutes.myParty,
        });
        break;
      case "join":
        //wannajoin
        navigate(MainRoutes.foodFriend, {
          screen: FoodFriendRoutes.waitingLists,
        });
        break;
      // Host ends room
      case "goBoom":
        navigate(MainRoutes.foodFriend, {
          screen: FoodFriendRoutes.myParty,
        });
        break;
      default:
        navigate(MainRoutes.home);
    }
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
