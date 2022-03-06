import React from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export function StartScreen({ navigation }) {
    return (
        <><View style={styles.container}><Logo /><Header>Mandaditos</Header><Paragraph>
            Nuestro destino es tu confianza.
        </Paragraph><Button
            mode="contained"
            onPress={() => navigation.navigate('LoginScreen')}
        >
                Login
            </Button><Button
                mode="outlined"
                onPress={() => navigation.navigate('RegisterScreen')}
            >
                Sign Up
            </Button></View></>
    )
}

const styles = StyleSheet.create({
    image: {
      width: 110,
      height: 110,
      marginBottom: 8,
    },
    container: {
      flex: 1,
      padding: 20,
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })