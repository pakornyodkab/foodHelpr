import { View, Text } from 'react-native'
import React, { createContext } from 'react'

const RestaurantContext = createContext('Select Restaurant');

const RestaurantProvider = () => {
  return (
    <View>
      <Text>RestaurantContext</Text>
    </View>
  )
}

export default RestaurantProvider