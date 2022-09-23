import * as React from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID, MY_SECURE_AUTH_STATE_KEY } from "@env";
import * as AuthSession from "expo-auth-session";
import GoogleApis from "../../apis/googleapis";
import {saveToken, getToken} from '../../libs/token'

WebBrowser.maybeCompleteAuthSession();
const discovery = {
  authorizationEndpoint: "http://10.0.2.2:3000/auth/google/login",
  tokenEndpoint: "http://10.0.2.2:3000/auth/google/redirect",
};

export default function HomeScreen({ navigation }) {
  // const [username, onChangeUsername] = React.useState("")
  // const [password, onChangePassword] = React.useState("")
  const [accessToken, setAccessToken] = React.useState<string>("");
  const [userInfo, setUserInfo] = React.useState<any>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  });

  const handleSignInResponse = async () => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      await saveToken(response.authentication.accessToken)
      // SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY, response.authentication.accessToken);
      // console.log(response.authentication.accessToken)
      // console.log(await getToken())
    }
  }

  React.useEffect(() => {
    handleSignInResponse();
  }, [response]);

  //!
  const getUserData = async () => {
    const { data } = await GoogleApis.GetUserData(accessToken);
    setUserInfo(data);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../../../assets/topBanner.png")}
        style={{ height: 200, width: 400, flex: accessToken ? 1 : 1.2 }}
      />
      <View style={{ flex: 3 }}>
        {accessToken && getUserData() && (
          <View>
            <View className="flex-row-reverse">
              <Image
                // source={require('../../../assets/Yod_oh_yes.jpg')}
                source={{ uri: userInfo?.picture }}
                style={{ height: 100, width: 100, top: -70 }}
                className="rounded-full"
              />
            </View>
            <Text className="bottom-16 text-right">Welcome back,</Text>
            <Text className="bottom-16 text-right text-2xl text-green-500">
              {userInfo?.name}
            </Text>
          </View>
        )}
        <Image
          className={`${accessToken ? "bottom-4" : "top-16"}`}
          source={require("../../../assets/FoodHelprLogo.png")}
          // style={{ height: '10%', width: '90%'}}
        />
        {!accessToken && (
          // <View>
          //   <TextInput
          //     style={{ paddingHorizontal: 20 }}
          //     className="top-28 h-10 border-2 text-left border-green-500 rounded-full"
          //     onChangeText={onChangeUsername}
          //     value={username}
          //     placeholder='Username'
          //     textContentType='username'
          //   />
          //   <TextInput
          //     style={{ paddingHorizontal: 20 }}
          //     className="top-32 h-10 border-2 text-left border-green-500 rounded-full"
          //     onChangeText={onChangePassword}
          //     value={password}
          //     placeholder='Password'
          //     textContentType='password'
          //     secureTextEntry
          //   />
          //   <Pressable
          //     className="top-40 flex h-10 w-28 justify-center self-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
          //     onPress={() => setIsLoggedIn(true)}
          //   >
          //     <Text className="text-center font-normal text-white">
          //       Sign In
          //     </Text>
          //   </Pressable>
          //   <Pressable
          //     className="top-52 flex h-10 w-40 justify-center self-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
          //     onPress={() => setIsLoggedIn(true)}
          //   >
          //     <Text className="text-center font-normal text-white">
          //       Sign In With Google
          //     </Text>
          //   </Pressable>
          //   <View
          //     // style={{paddingTop: 270}}
          //     className="top-64 flex-row justify-end text-right font-normal text-black"
          //   >
          //     <Text>Need an account? </Text>
          //     <Pressable
          //         // className="top-1"
          //         onPress={() => setIsLoggedIn(true)}
          //       >
          //         <Text className='text-green-500 underline'>Sign Up</Text>
          //       </Pressable>
          //     </View>
          // </View>
          <Pressable
            className="top-48 flex h-10 w-40 justify-center self-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
            onPress={() => promptAsync()}
          >
            <Text className="text-center font-normal text-white">
              Sign In With Google
            </Text>
          </Pressable>
        )}
        {accessToken && (
          <View className="flex items-center justify-center gap-1">
            <Pressable
              className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
              onPress={() => navigation.navigate("Random Restaurants")}
            >
              <View className="relative flex h-full justify-center">
                <Text className="absolute left-4 text-white">
                  <MaterialIcons name="restaurant" size={24} />
                </Text>
                <Text className="text-center font-normal text-white">
                  Find your restaurants
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 opacity-40 active:scale-95 active:bg-green-700"
              onPress={() => console.log("comming soon")}
              disabled
            >
              <View className="relative flex h-full justify-center">
                <Text className="absolute left-4 text-white">
                  <MaterialIcons name="microwave" size={24} />
                </Text>
                <Text className="text-center font-normal text-white">
                  Find your recipes
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 opacity-40 active:scale-95 active:bg-green-700"
              onPress={() => console.log("comming soon")}
              disabled
            >
              <View className="relative flex h-full justify-center">
                <Text className="absolute left-4 text-white">
                  <MaterialIcons name="people" size={24} />
                </Text>
                <Text className="text-center font-normal text-white">
                  Find your food friends
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="top-36 flex h-10 w-40 justify-center self-center rounded-full border-[1px] border-green-500 bg-white active:scale-95 active:bg-gray-300"
              onPress={() => {
                setAccessToken("");
              }}
            >
              <Text className="text-center font-normal text-green-500">
                Sign Out
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
