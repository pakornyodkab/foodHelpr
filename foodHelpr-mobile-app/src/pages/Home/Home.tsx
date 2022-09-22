import * as React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>FoodHelpr</Text>
      {!isLoggedIn && <Button
        title="Login With Google oAuth"
        onPress={() => setIsLoggedIn(true)} />}
      {isLoggedIn && <Button
        title="Random Restaurants"
        onPress={() => navigation.navigate('Random Restaurants')}
      />}
    </View>
  );
}
