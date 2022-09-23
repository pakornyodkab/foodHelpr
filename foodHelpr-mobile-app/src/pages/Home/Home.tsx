import * as React from 'react';
import { View, Text, Button, Image, Pressable } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={require('../../../assets/topBanner.png')}
        style={{ height: 200, width: 400, flex: isLoggedIn ? 1 : 1.5 }}
      />
      <View style={{ flex: 3 }}>
        {isLoggedIn &&
          <View>
            <View className='flex-row-reverse'>
              <Image
                source={require('../../../assets/Yod_oh_yes.jpg')}
                style={{ height: 100, width: 100, top: -70 }}
                className="rounded-full"
              />
              </View>
              <Text className='text-right bottom-16'>Welcome back,</Text>
              <Text className='text-right bottom-16 text-green-500 text-2xl'>Pakorn Kongrit</Text>
          </View>
        }
        <Image
          className={`${isLoggedIn ? 'bottom-4' : 'top-28'}`}
          source={require('../../../assets/FoodHelprLogo.png')}
        // style={{ height: '10%', width: '90%'}}
        />
        {!isLoggedIn &&
          // <Button
          //   color='#2CBB54'

          //   title="Login With Google oAuth"
          //   onPress={() => setIsLoggedIn(true)} 
          // />
          <Pressable
            className="top-48 flex h-10 w-40 justify-center self-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
            onPress={() => setIsLoggedIn(true)}
          >
            <Text className="text-center font-semibold text-white">
              Sign In With Google
            </Text>
          </Pressable>
        }
        {isLoggedIn &&
          <View>
            <Pressable
              className="top-12 flex h-10 w-72 justify-center self-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700"
              onPress={() => navigation.navigate('Random Restaurants')}
            >
              <View className="flex-wrap justify-center self-center">
                <Text className=" text-white">
                  <MaterialIcons name="restaurant" size={24} />
                </Text>
                <Text className="text-center font-semibold text-white">
                  Find your restaurants
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="top-16 flex h-10 w-72 justify-center self-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700 opacity-40"
              onPress={() => setIsLoggedIn(true)}
              disabled
            >
              <View className="flex-wrap justify-center self-center">
                <Text className=" text-white">
                  <MaterialIcons name="microwave" size={24} />
                </Text>
                <Text className="text-center font-semibold text-white">
                  Find your recipes
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="top-20 flex h-10 w-72 justify-center self-center rounded-full border-[1px] border-white bg-green-500 active:scale-95 active:bg-green-700 opacity-40"
              onPress={() => setIsLoggedIn(true)}
              disabled
            >
              <View className="flex-wrap justify-center self-center">
                <Text className=" text-white">
                  <MaterialIcons name="people" size={24} />
                </Text>
                <Text className="text-center font-semibold text-white">
                  Find your food friends
                </Text>
              </View>
            </Pressable>
            <Pressable
              className="top-36 flex h-10 w-40 justify-center self-center rounded-full border-[1px] border-green-500 bg-white active:scale-95 active:bg-green-700"
              onPress={() => setIsLoggedIn(false)}
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
