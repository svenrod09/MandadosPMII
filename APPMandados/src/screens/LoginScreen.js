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
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const onLoginPressed = async () =>{
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if(!email || !password){
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
    }else{
       try {
        const respuesta = await fetch('http://192.168.1.9:5000/api/autenticacion/iniciosesion', {
          mode: 'no-cors',
          method: 'POST',
          headers:{
            'Access-Control-Allow-Headers':'application/json',
             Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              correo: email,
              contrasena: password
          })
        });
        const json = await respuesta.json();
        console.log(json);
        const data = json.data;
       if(!data.token)
        {
          
        }
        else
        {
          const token = data.token;
          console.log(token);
          
        }

        Alert.alert("MANDADITOS", json.msj);
        navigation.navigate("CategoryScreen");
       
    } catch (error) {
      console.log("Ha ocurrido un error ", error);
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
      <TouchableOpacity
        onPress={() => navigation.navigate('ResetPasswordScreen')}
      >
        <Text style={styles.forgot}>¿Olvidaste tu Contraseña?</Text>
      </TouchableOpacity>
    </View>
    <Button mode="contained" onPress={onLoginPressed} >
     iniciar Sesión
    </Button>
    <View style={styles.row}>
      <Text>¿No tienes una cuenta? </Text>
      <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
        <Text style={styles.link}>Registrate</Text>
      </TouchableOpacity>
    </View>
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
