import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
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
import { nameValidator } from '../helpers/nameValidator'
import { apellidoValidator } from '../helpers/apellidoValidator'
import { telefonoValidator } from '../helpers/telefonoValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [Apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const apellidoError = apellidoValidator(Apellido.value)
    const telefonoError = telefonoValidator(telefono.value)
    if (emailError || passwordError || nameError || apellidoError || telefonoError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setApellido({ ...Apellido, error: apellidoError })
      setTelefono({ ...telefono, error: telefonoError })
   
    }else{

      try {
        const respuesta = await fetch('http://192.168.1.9:5000/api/usuarios/registrarse', {
          mode: 'no-cors',
          method: 'POST',
          headers:{
            'Access-Control-Allow-Headers':'application/json',
             Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              correo: email,
              contrasena: password,
              nombre: name,
              apellido: Apellido,
              telefono: telefono
          })
          
        });
  
        const json = await respuesta.json();
        console.log(json);
        const data = json.data;

        Alert.alert("MANDADITOS", json.msj);
  
      } catch (error) {
        Alert.alert("MANDADITOS", "Ha ocurrido un error")
        console.log("Ha ocurrido un error ", error);
      }
    }
    
  }

  return (
    <ScrollView scrollEnabled={true}>
    <Background style={styles.container}>
    <BackButton goBack={navigation.goBack} />
    <Logo />
    <Header>Crear Cuenta</Header>

    <TextInput
      label="Correo"
      returnKeyType="next"
      value={email.value}
      onChangeText={(text) => setEmail({ value: text, error: '' })}
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
      value={password.value}
      onChangeText={(text) => setPassword({ value: text, error: '' })}
      error={!!password.error}
      errorText={password.error}
      secureTextEntry
    />
    <TextInput
      label="Nombre"
      returnKeyType="next"
      value={name.value}
      onChangeText={(text) => setName({ value: text, error: '' })}
      error={!!name.error}
      errorText={name.error}
    />
    <TextInput
      label="Apellido"
      returnKeyType="next"
      value={Apellido.value}
      onChangeText={(text) => setApellido({ value: text, error: '' })}
      error={!!Apellido.error}
      errorText={Apellido.error}
    />
    <TextInput
      label="Teléfono"
      keyboardType="numeric"
      returnKeyType="next"
      value={telefono.value}
      onChangeText={(text) => setTelefono({ value: text, error: '' })}
      error={!!telefono.error}
      errorText={telefono.error}
    />
    <Button
      mode="contained"
      onPress={onSignUpPressed}
      style={{ marginTop: 24 }}
    >
      Registrarse
    </Button>
    <View style={styles.row}>
      <Text>¿Ya tienes una cuenta? </Text>
      <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
        <Text style={styles.link}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  </Background>
  </ScrollView>

  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 0
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container:{
    padding: 15,
    marginTop: 50,
  }
})
