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
import ChatScreen from "./ChatScreen";
import Button from "../../components/common/Button";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { getToken } from "../../libs/token";
import { getUser } from "../../libs/user";
import IUser from "../../models/User";

const Chat = ({ navigation }) => {
  const handleOnPressBack = () => {
    navigation.goBack();
  };
  const [messages, setMessages] = useState([
    {
      _id: "1",
      text: "Hello developer",
      createdAt: new Date(2022, 8, 24, 10, 33, 30, 0),
      user: {
        _id: 2,
        name: "Bryan",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
    {
      _id: "2",
      text: "Hello Pakorn",
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "Anthony",
        avatar:
          "https://th.bing.com/th/id/OIP.RDGUSyngwmMzWs8XUhwQvAHaHa?pid=ImgDet&rs=1",
      },
    },
  ]);

  const [party, setParty] = useState({
    _id: "1",
    name: "Let's Party",
    restaurant: "",
    memberList: [
      {
        user_id: 1,
        name: "Anthony",
      },
      {
        user_id: 2,
        name: "Bryan",
      },
      {
        user_id: 3,
        name: "Yod",
      },
    ],
  });
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

  function formatChat(messages) {
    return messages.map((message) => {
      const date = new Date(message.createdAt);
      return {
        _id: message._id,
        text: message.message,
        createdAt: date,
        user: {
          _id: message.senderId,
          name: "Mock",
          avatar:
            "https://th.bing.com/th/id/OIP.RDGUSyngwmMzWs8XUhwQvAHaHa?pid=ImgDet&rs=1",
        },
      };
    });
  }

  const connectSocket = async () => {
    console.log("Run connectSocket");
    socketRef.current = io("http://10.0.2.2:3010", {
      transports: ["websocket"],
      extraHeaders: {
        Authorization: `Bearer ${await getToken()}`,
      },
      query: {
        roomId: party._id,
        registrationToken: "123",
      },
    });

    socketRef.current.on("allChats", (msg) => {
      console.log("Msg from allChats", msg);
      setMessages([...messages, ...formatChat(msg)]);
    });

    socketRef.current.on("newChat", (msg) => {
      console.log("Msg from newChat", msg);
      setMessages([...messages, ...formatChat(msg)]);
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
    getMyUser();
    return () => {
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
