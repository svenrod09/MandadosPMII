import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
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
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [Apellido, setApellido] = useState({ value: '', error: '' })
  const [telefono, setTelefono] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
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
   
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
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
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
