import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartScreen } from './src/screens/StartScreen';
import { CategoryScreen } from './src/screens/CategoryScreen';
import { RestaurantScreen } from './src/screens/RestaurantScreen';
import { MenuScreen } from './src/screens/MenuScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

