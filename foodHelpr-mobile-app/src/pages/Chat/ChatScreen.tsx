import React, { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Alert,
  Image,
  View,
  TextInput,
} from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import IUser from "../../models/User";

type ChatScreenProp = {
  messages: any;
  setMessages: any;
  onChatSend: any;
  user: IUser;
};

const ChatScreen = ({
  messages,
  setMessages,
  onChatSend,
  user,
}: ChatScreenProp) => {
  const styles = StyleSheet.create({
    container: {
      height: 400,
      flex: 1,
      backgroundColor: "#F5FCFF",
    },
  });

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    onChatSend(messages);
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#22C55E",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send
        {...props}
        textStyle={{
          color: "#22C55E",
        }}
      />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user?.user_id?.toString(),
      }}
      renderBubble={renderBubble}
      renderUsernameOnMessage={true}
      renderSend={renderSend}
      inverted={false}
    />
  );
};

export default ChatScreen;
