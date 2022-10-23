import * as React from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  ANDROID_CLIENT_ID,
  EXPO_CLIENT_ID,
  MY_SECURE_AUTH_STATE_KEY,
  IOS_CLIENT_ID,
} from "@env";
import * as AuthSession from "expo-auth-session";
import GoogleApis from "../../apis/googleapis";
import { saveToken, getToken } from "../../libs/token";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as Linking from "expo-linking";
import AuthService from "../../apis/auth";
import MainRoutes from "../../routes/main";
import AgeModal from "../../components/party/AgeModal";
import { getUser, saveUser } from "../../libs/user";
import UserService from "../../apis/user";
import * as Notifications from "expo-notifications";
import NotificationService from "../../apis/notification";

//WebBrowser.maybeCompleteAuthSession();
// const discovery = {
//   authorizationEndpoint: "http://10.0.2.2.nip.io:3000/auth/google/login",
//   tokenEndpoint: "http://10.0.2.2.nip.io:3000/auth/google/redirect",
// };

export default function HomeScreen({ navigation }) {
  // const [username, onChangeUsername] = React.useState("")
  // const [password, onChangePassword] = React.useState("")
  const [accessToken, setAccessToken] = React.useState<string>("");
  const [userInfo, setUserInfo] = React.useState<any>();
  const [stealCheckenToken, setStealChickenToken] = React.useState<string>("");
  const [ageModal, setAgeModal] = React.useState<boolean>(false);

  // console.log('hello',discovery);
  // return <Text>
  //   {ANDROID_CLIENT_ID}\n
  //   {EXPO_CLIENT_ID}
  // </Text>

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  });

  // const [request, response, promptAsync] = useAuthRequest(
  //   {
  //     clientId: "1089522380741-kbnf41snq90sgvdiidsdhsspjj25l1lf.apps.googleusercontent.com",
  //     scopes: ['email', 'profile'],
  //     redirectUri: "http://10.0.2.2.nip.io:3000/auth/google/redirect",
  //   },
  //   discovery
  // );

  const ageValidation = async () => {
    const user = await getUser();
    return Number(user.age) == 0;
  };

  const getFoodHelprToken = async (googleToken: string) => {
    try {
      const authService = new AuthService();
      return await authService.GetToken(googleToken);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const sendExpoNotiToken = async () => {
    const expoToken = await Notifications.getExpoPushTokenAsync();
    const accessToken = await getToken();
    const notificationService = new NotificationService(accessToken);
    try {
      await notificationService.sendExpotoken(expoToken.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const removeExpoNotiToken = async () => {
    const expoToken = await Notifications.getExpoPushTokenAsync();
    const accessToken = await getToken();
    const notificationService = new NotificationService(accessToken);
    try {
      await notificationService.removeExpoToken(expoToken.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSignInResponse = async () => {
    try {
      if (response?.type === "success") {
        setStealChickenToken(response.authentication.accessToken);
        const tokenResponse = await getFoodHelprToken(
          response.authentication.accessToken
        );
        const token = tokenResponse.data.access_token;
        setAccessToken(token);
        await saveToken(token);
        const userService = new UserService(token);
        const myUserResponse = await userService.GetMyUser();
        await saveUser(myUserResponse.data);
        console.log(myUserResponse.data);
        setAgeModal(myUserResponse.data.age === 0);
        // SecureStore.setItemAsync(MY_SECURE_AUTH_STATE_KEY, response.authentication.accessToken);
        // console.log(response.authentication.accessToken);
        // console.log(await getToken())
        console.log("Call Send Expo Token");
        await sendExpoNotiToken();
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const handleSignOut = async () => {
    setAccessToken("");
    await removeExpoNotiToken();
  };

  React.useEffect(() => {
    handleSignInResponse();
  }, [response]);

  //!
  const getUserData = async () => {
    const googleApis = new GoogleApis();
    const { data } = await googleApis.GetUserData(stealCheckenToken);
    setUserInfo(data);
    console.log("userInfo picture", userInfo.picture);
  };

  React.useEffect(() => {
    getUserData();
  }, [stealCheckenToken]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../../../assets/topBanner.png")}
        style={{ height: 200, width: 400, flex: accessToken ? 1 : 1.2 }}
      />
      <View style={{ flex: 3 }}>
        {accessToken && userInfo && (
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
            onPress={() => {
              promptAsync();
            }}
          >
            <Text className="text-center font-normal text-white">
              Sign In With Google
            </Text>
          </Pressable>
        )}
        {accessToken && (
          <>
            <View className="flex items-center justify-center gap-1">
              <Pressable
                className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
                onPress={() => navigation.navigate(MainRoutes.restaurant)}
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
                className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
                onPress={() => navigation.navigate(MainRoutes.recipe)}
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
                className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
                onPress={() => navigation.navigate(MainRoutes.foodFriend)}
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
              {/* <Pressable
                className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
                onPress={() => navigation.navigate(MainRoutes.createParty)}
              >
                <View className="relative flex h-full justify-center">
                  <Text className="absolute left-4 text-white">
                    <MaterialIcons name="people" size={24} />
                  </Text>
                  <Text className="text-center font-normal text-white">
                    Create Your Party
                  </Text>
                </View>
              </Pressable>
              <Pressable
                className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
                onPress={() => handleChatPress()}
              >
                <View className="relative flex h-full justify-center">
                  <Text className="absolute left-4 text-white">
                    <MaterialIcons name="chat" size={24} />
                  </Text>
                  <Text className="text-center font-normal text-white">
                    Let's Chat
                  </Text>
                </View>
              </Pressable> */}
              {ageModal && <AgeModal></AgeModal>}
            </View>
            <View>
              <Pressable
                className="top-20 flex h-10 w-40 justify-center self-center rounded-full border-[1px] border-green-500 bg-white active:scale-95 active:bg-gray-300"
                onPress={() => {
                  handleSignOut();
                }}
              >
                <Text className="text-center font-normal text-green-500">
                  Sign Out
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
