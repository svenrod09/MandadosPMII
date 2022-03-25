import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { theme } from './src/core/theme'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  RestaurantScreen,
  Dashboard,
  MenuScreen,
  FarmaciaScreen,
  ConvenienciaScreen,
  PedidosScreen,
  CategoryScreen,
  CambiarContrasena,
  ProductDetailScreen,
  TiendasScreen,
  HistorialPedidos
} from './src/screens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MenuScreen" component={MenuScreen} />
          <Stack.Screen name="FarmaciaScreen" component={FarmaciaScreen} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stack.Screen name="ConvenienciaScreen" component={ConvenienciaScreen} />
          <Stack.Screen name="CambiarContrasena" component={CambiarContrasena} />
          <Stack.Screen name="PedidosScreen" component={PedidosScreen} />
          <Stack.Screen name="HistorialPedidos" component={HistorialPedidos} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="TiendasScreen" component={TiendasScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
