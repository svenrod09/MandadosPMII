import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph, RadioButton, Text } from 'react-native-paper';
import { theme } from '../core/theme'
import TextInput from '../components/TextInput'
import { nameValidator } from '../helpers/nameValidator'
import { emailValidator } from '../helpers/emailValidator';
import { apellidoValidator } from '../helpers/apellidoValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { telefonoValidator } from '../helpers/telefonoValidator'
import { Logo } from '../components/Logo'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function NuevaTiendaScreen({ route, navigation }) {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [Apellido, setApellido] = React.useState("")
    const [telefono, setTelefono] = React.useState("")


    const btnPressed = async () => {
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
        }
        else {
            axios.post("http://192.168.1.9:5000/api/usuarios/registrarE", {
                correo: email.value,
                contrasena: password.value,
                nombre: name.value,
                apellido: Apellido.value,
                telefono: telefono.value
            })
                .then((response) => {
                    Alert.alert("MANDADITOS", "Usuario Registrado Correctamente");
                    navigation.goBack();
                });
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Agregar Empleado" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
            
                <View style={styles.container}>

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
                    
                    <View style={styles.containerT}>
                        <Button color={theme.colors.primary} mode="contained" onPress={btnPressed}>
                            Guardar</Button>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 0.1,
        borderColor: '#c6c6c6'
    },
    containerT: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingBottom: 20,
    },
    colorPrimary: {
        backgroundColor: theme.colors.primary,
    },
    textPrimary: {
        color: theme.colors.primary,
    }
});