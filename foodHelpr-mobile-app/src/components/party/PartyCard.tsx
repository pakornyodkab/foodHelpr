import { View, Text , Image} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Button from '../common/Button'

export default function PartyCard({
  // partyName,
  // guestNumber,
  // maxGuests,
  // apptDate,
  // memberList
}) {
  return (
    <View className="flex p-4 bg-transparent border-2 border-green-500 rounded-lg shadow-lg max-w-sm mb-4 ">
      <View className="flex-row space-x-2">
        <View className='flex-row space-x-1'>
            <Ionicons name='people' size={20}/>
            <Text>
                6/10
            </Text>
        </View>
        <Text>
            Let’s Party | 20+
        </Text>
      </View>
      <View className='flex items-center'>
        <Image source={require("../../../assets/member.png")} style={{ height: 20}} className=' rounded-md'/>
      </View>
      <View className="flex-row items-center space-x-3">
        <Text>
            11/10/2022 18:18 PM
        </Text>
        <Button className='px-2 py-1 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg bg-green-500 active:scale-95 active:bg-green-700 active:shadow-lg duration-150'>
            <Text className='text-white'>Join</Text>
        </Button>
      </View>
    </View>
  )
}