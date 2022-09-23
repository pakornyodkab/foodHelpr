import * as React from 'react';
import { View, Text, Image, Pressable, TextInput } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

export default function HomeScreen({ navigation }) {
  // const [username, onChangeUsername] = React.useState("")
  // const [password, onChangePassword] = React.useState("")
  const [accessToken, setAccessToken] = React.useState<string>("")
  const [userInfo, setUserInfo] = React.useState<any>()

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1089522380741-kbnf41snq90sgvdiidsdhsspjj25l1lf.apps.googleusercontent.com",
    expoClientId: "750278734395-2chutsqvl628cqjmdlv10j20gaela8to.apps.googleusercontent.com"
  })

  React.useEffect(() => {
    if (response?.type==="success"){
      setAccessToken(response.authentication.accessToken)
    }
  }, [response])

  const getUserData = async () => {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    })

    userInfoResponse.json().then(data => {
      setUserInfo(data)
    })
    console.log(userInfo)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../../../assets/topBanner.png')}
        style={{ height: 200, width: 400, flex: accessToken ? 1 : 1.2 }}
      />
      <View style={{ flex: 3 }}>
        {accessToken && getUserData() &&
          <View>
            <View className='flex-row-reverse'>
              <Image
                // source={require('../../../assets/Yod_oh_yes.jpg')}
                source={{uri: userInfo?.picture}}
                style={{ height: 100, width: 100, top: -70 }}
                className="rounded-full"
              />
            </View>
            <Text className='text-right bottom-16'>Welcome back,</Text>
            <Text className='text-right bottom-16 text-green-500 text-2xl'>{userInfo?.name}</Text>
          </View>
        }
        <Image
          className={`${accessToken ? 'bottom-4' : 'top-16'}`}
          source={require('../../../assets/FoodHelprLogo.png')}
        // style={{ height: '10%', width: '90%'}}
        />
        {!accessToken &&
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
            onPress={() => promptAsync()} //{showInRecents: true}
          >
            <Text className="text-center font-normal text-white">
              Sign In With Google
            </Text>
          </Pressable>
        }
        {accessToken &&
          <View className="flex justify-center items-center gap-1">
            <Pressable
              className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
              onPress={() => navigation.navigate('Random Restaurants')}
            >
              <View className="relative h-full flex justify-center">
                <Text className="left-4 absolute text-white">
                  <MaterialIcons name="restaurant" size={24} />
                </Text>
                <Text className="text-center font-normal text-white">
                  Find your restaurants
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700 opacity-40"
              onPress={() => console.log('comming soon')}
              disabled
            >
              <View className="relative h-full flex justify-center">
                <Text className="left-4 absolute text-white">
                  <MaterialIcons name="microwave" size={24} />
                </Text>
                <Text className="text-center font-normal text-white">
                  Find your recipes
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="flex h-10 w-72 justify-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700 opacity-40"
              onPress={() => console.log('comming soon')}
              disabled
            >
              <View className="relative h-full flex justify-center">
                <Text className="left-4 absolute text-white">
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
                setAccessToken("")
              }}
            >
              <Text className="text-center font-normal text-green-500">
                Sign Out
              </Text>
            </Pressable>
          </View>}
      </View>
    </View>
  );
}
