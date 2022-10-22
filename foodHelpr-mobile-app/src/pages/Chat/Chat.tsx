import React, { useCallback, useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  Image,
  View,
  TextInput,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import ChatScreen from "../../components/chat/ChatScreen";
import Button from "../../components/common/Button";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getToken } from "../../libs/token";
import { getUser } from "../../libs/user";
import IUser from "../../models/User";

const Chat = ({ route, navigation }) => {
  const { party } = route.params;
  console.log("====================================");
  console.log(`Party: ${JSON.stringify(party)}`);
  console.log("====================================");
  const handleOnPressBack = () => {
    navigation.goBack();
  };
  const [messages, setMessages] = useState([]);

  // const [party, setParty] = useState({
  //   _id: "1",
  //   name: "Let's Party",
  //   restaurant: "",
  //   memberList: [
  //     {
  //       user_id: 1,
  //       name: "Anthony",
  //     },
  //     {
  //       user_id: 2,
  //       name: "Bryan",
  //     },
  //     {
  //       user_id: 3,
  //       name: "Yod",
  //     },
  //   ],
  // });
  const socketRef = useRef<Socket>(null);
  const userRef = useRef<IUser>();

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 2,
  //       text: "Hello Pakorn",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: "Anthony",
  //         avatar:
  //           "https://th.bing.com/th/id/OIP.RDGUSyngwmMzWs8XUhwQvAHaHa?pid=ImgDet&rs=1",
  //       },
  //     },
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(2022, 8, 24, 10, 33, 30, 0),
  //       user: {
  //         _id: 2,
  //         name: "Bryan",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  //   setParty({
  //     _id: 1,
  //     name: "Let's Party",
  //     restaurant: "",
  //     memberList: [
  //       {
  //         user_id: 1,
  //         name: "Anthony",
  //       },
  //       {
  //         user_id: 2,
  //         name: "Bryan",
  //       },
  //       {
  //         user_id: 3,
  //         name: "Yod",
  //       },
  //     ],
  //   });
  // }, []);

  //     {
  //       _id: 2,
  //       text: "Hello Pakorn",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: "Anthony",
  //         avatar:
  //           "https://th.bing.com/th/id/OIP.RDGUSyngwmMzWs8XUhwQvAHaHa?pid=ImgDet&rs=1",
  //       },
  //     },

  function formatChat(message) {
    const date = new Date(message.createdAt);
    // const avatar =
    // "https://th.bing.com/th/id/OIP.RDGUSyngwmMzWs8XUhwQvAHaHa?pid=ImgDet&rs=1";
    const avatar = message.senderData.profile_picture;
    return {
      _id: message._id,
      text: message.message,
      createdAt: date,
      user: {
        _id: message.senderData.user_id.toString(),
        name: message.senderData.firstname + " " + message.senderData.lastname,
        avatar: avatar,
      },
    };
  }

  const connectSocket = async () => {
    await getMyUser();
    console.log("Run connectSocket");
    socketRef.current = io("ws://192.168.43.128:3010", {
      transports: ["websocket"],
      extraHeaders: {
        Authorization: `Bearer ${await getToken()}`,
      },
      query: {
        roomId: party._id,
        registrationToken: "123",
      },
    });
    console.log("Connect To Socket Complete");
    socketRef.current.on("allChats", (msgs) => {
      console.log("Msg from allChats");
      const formattedMsgs = msgs
        .map((msg) => {
          return formatChat(msg);
        })
        .sort((a, b) => -(a.createdAt - b.createdAt));
      setMessages(formattedMsgs);
    });

    socketRef.current.on("newChat", (msg) => {
      console.log("Msg from newChat", msg);
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [formatChat(msg)])
      );
    });
  };

  const onChatSend = (message) => {
    console.log("Chat send msg", JSON.stringify(message));
    socketRef.current.emit("chat", {
      roomId: party._id,
      message: message[0].text,
    });
  };

  const getMyUser = async () => {
    userRef.current = await getUser();
  };

  useEffect(() => {
    connectSocket();
    return () => {
      console.log("Into useEffect CallBack");
      socketRef.current.close();
    };
  }, []);

  return (
    <SafeAreaView className="relative h-full w-full bg-white">
      <Image
        className="absolute -top-36"
        source={require("../../../assets/topBanner.png")}
        style={{ height: 200, width: 400, flex: 1 }}
      />
      <View className="top-8 mx-4 mt-4 flex flex-row  pb-5">
        <Button className="h-12 w-12" onPress={handleOnPressBack}>
          <Text className="text-center font-semibold text-white">
            <FontAwesome name="arrow-left" size={16} />
          </Text>
        </Button>
        <View className=" mx-4  items-center justify-center ">
          <Text
            className="text-center font-semibold text-green-500"
            style={{ fontSize: 24 }}
          >
            {`${party ? party.name : ""} (${
              party ? party.memberList.length : 0
            })`}
          </Text>
        </View>
      </View>
      <ChatScreen
        messages={messages}
        setMessages={setMessages}
        onChatSend={onChatSend}
        user={userRef?.current}
      />
    </SafeAreaView>
  );
};

export default Chat;
