import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

export default function CambiarContrasena({ navigation }) {
  const [email, setEmail] = useState("")//PIN
  const [contrasena, setContrasena] = useState("")


  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(contrasena.value)

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setContrasena({ ...contrasena, error: passwordError })
    }

    navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Cambiar Contraseña</Header>
      <TextInput
        label="Pin"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="numeric"
        description="Ingresa el Pin que recibiste."
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={contrasena.value}
        onChangeText={(text) => setContrasena({ value: text, error: '' })}
        error={!!contrasena.error}
        errorText={contrasena.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Cambiar Contraseña
      </Button>
    </Background>
  )
}
