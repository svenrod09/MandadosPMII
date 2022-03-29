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
  TiendasScreen,
  Dashboard,
  MenuScreen,
  FarmaciaScreen,
  ConvenienciaScreen,
  PedidosScreen,
  CategoryScreen,
  ProductDetailScreen,
  HistorialPedidos,
  AdminScreen,
  MantenimientoScreen,
  GestionPedidoScreen,
  CRUDTiendasScreen,
  NuevaTiendaScreen,
  ListarTiendaScreen,
  ModificarTiendaScreen,
  EliminarTiendaScreen,
  VerTiendaScreen,
  DesactivarTiendaScreen,
  ActualizarTiendaScreen
} from './src/screens'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AdminScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="TiendasScreen" component={TiendasScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MenuScreen" component={MenuScreen} />
          <Stack.Screen name="FarmaciaScreen" component={FarmaciaScreen} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stack.Screen name="ConvenienciaScreen" component={ConvenienciaScreen} />
          <Stack.Screen name="PedidosScreen" component={PedidosScreen} />
          <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
          <Stack.Screen name="HistorialPedidos" component={HistorialPedidos} />
          <Stack.Screen name="AdminScreen" component={AdminScreen} />
          <Stack.Screen name="MantenimientoScreen" component={MantenimientoScreen} />
          <Stack.Screen name="GestionPedidoScreen" component={GestionPedidoScreen} />
          <Stack.Screen name="CRUDTiendasScreen" component={CRUDTiendasScreen} />
          <Stack.Screen name="NuevaTiendaScreen" component={NuevaTiendaScreen} />
          <Stack.Screen name="ListarTiendaScreen" component={ListarTiendaScreen} />
          <Stack.Screen name="ModificarTiendaScreen" component={ModificarTiendaScreen} />
          <Stack.Screen name="EliminarTiendaScreen" component={EliminarTiendaScreen} />
          <Stack.Screen name="VerTiendaScreen" component={VerTiendaScreen} />
          <Stack.Screen name="DesactivarTiendaScreen" component={DesactivarTiendaScreen} />
          <Stack.Screen name="ActualizarTiendaScreen" component={ActualizarTiendaScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
