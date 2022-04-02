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
  CRUDCategoriasScreen,
  NuevaTiendaScreen,
  NuevaCategoriaScreen,
  ListarTiendaScreen,
  ListarCategoriaScreen,
  ModificarTiendaScreen,
  ModificarCategoriaScreen,
  EliminarTiendaScreen,
  EliminarCategoriaScreen,
  VerTiendaScreen,
  VerCategoriaScreen,
  DesactivarTiendaScreen,
  DesactivarCategoriaScreen,
  ActualizarTiendaScreen,
  ActualizarCategoriaScreen,
  AsignarPedidoScreen,
  PedidoAsignadoScreen,
  CancelarPedidoScreen,
  PedidoCanceladoScreen,
  AgregarImagenScreen,
  AgregarImagenCScreen,
  SeleccionarImagenScreen,
  EmpleadoScreen,
  EntregaPedidoScreen,
  ConfirmarEntregaScreen
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
          <Stack.Screen name="CRUDCategoriasScreen" component={CRUDCategoriasScreen} />
          <Stack.Screen name="NuevaTiendaScreen" component={NuevaTiendaScreen} />
          <Stack.Screen name="NuevaCategoriaScreen" component={NuevaCategoriaScreen} />
          <Stack.Screen name="ListarTiendaScreen" component={ListarTiendaScreen} />
          <Stack.Screen name="ListarCategoriaScreen" component={ListarCategoriaScreen} />
          <Stack.Screen name="ModificarTiendaScreen" component={ModificarTiendaScreen} />
          <Stack.Screen name="ModificarCategoriaScreen" component={ModificarCategoriaScreen} />
          <Stack.Screen name="EliminarTiendaScreen" component={EliminarTiendaScreen} />
          <Stack.Screen name="EliminarCategoriaScreen" component={EliminarCategoriaScreen} />
          <Stack.Screen name="VerTiendaScreen" component={VerTiendaScreen} />
          <Stack.Screen name="VerCategoriaScreen" component={VerCategoriaScreen} />
          <Stack.Screen name="DesactivarTiendaScreen" component={DesactivarTiendaScreen} />
          <Stack.Screen name="DesactivarCategoriaScreen" component={DesactivarCategoriaScreen} />
          <Stack.Screen name="ActualizarTiendaScreen" component={ActualizarTiendaScreen} />
          <Stack.Screen name="ActualizarCategoriaScreen" component={ActualizarCategoriaScreen} />
          <Stack.Screen name="AsignarPedidoScreen" component={AsignarPedidoScreen} />
          <Stack.Screen name="PedidoAsignadoScreen" component={PedidoAsignadoScreen} />
          <Stack.Screen name="CancelarPedidoScreen" component={CancelarPedidoScreen} />
          <Stack.Screen name="PedidoCanceladoScreen" component={PedidoCanceladoScreen} />
          <Stack.Screen name="AgregarImagenScreen" component={AgregarImagenScreen} />
          <Stack.Screen name="AgregarImagenCScreen" component={AgregarImagenCScreen} /> 
          <Stack.Screen name="SeleccionarImagenScreen" component={SeleccionarImagenScreen} />
          <Stack.Screen name="EmpleadoScreen" component={EmpleadoScreen} />
          <Stack.Screen name="EntregaPedidoScreen" component={EntregaPedidoScreen} />
          <Stack.Screen name="ConfirmarEntregaScreen" component={ConfirmarEntregaScreen} />
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
