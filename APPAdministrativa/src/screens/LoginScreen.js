import React from 'react'
import { useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const anotherFunc = (val) =>{
    setEmail('');
}
const anotherFunc1 = (val) =>{
  setPassword('');
}

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (!email || !password) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
    } else {
      try {
        const respuesta = await fetch('http://192.168.1.9:5000/api/autenticacion/iniciosesion', {
          mode: 'no-cors',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': 'application/json',
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            correo: email,
            contrasena: password
          })
        });
        const json = await respuesta.json();
        console.log(json.data.correo.idtipo)

        if (json.data.lenght == 0) {
          console.log(json.msj);
          Alert.alert("MANDADITOS", json.msj);
        }
        else {
          const cliente = JSON.stringify(json.data);
          await AsyncStorage.setItem('correo', cliente);
          const id = json.data.correo.id;
          const tipo = json.data.correo.idtipo;

          var datos = JSON.parse(await AsyncStorage.getItem('correo'))
          
          if(tipo != 2){
            Alert.alert("MANDADITOS", "El usuario no tiene autorización")
          }
          else{
           navigation.navigate("AdminScreen", { token: datos.token, UserId: id });
           anotherFunc(email);
           anotherFunc1(password);
           
            Alert.alert("MANDADITOS", json.msj);
          }
         


        }



      } catch (error) {
        console.log("Ha ocurrido un error ", error);
        Alert.alert("MANDADITOS", "El Usuario o Contraseña son inválidos")
      }
    }

  }



  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Bienvenido.</Header>
      <TextInput
        placeholder="Correo"
        returnKeyType="next"
        value={email}
        onChangeText={setEmail}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password}
        onChangeText={setPassword}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
      </View>
      <Button mode="contained" onPress={onLoginPressed} >
        iniciar Sesión
      </Button>

    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
