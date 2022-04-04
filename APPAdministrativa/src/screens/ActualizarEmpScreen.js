import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph, RadioButton, Text, List } from 'react-native-paper';
import { theme } from '../core/theme'
import TextInput from '../components/TextInput'
import { nameValidator } from '../helpers/nameValidator'
import { telefonoValidator } from '../helpers/telefonoValidator'
import { direccionValidator } from '../helpers/direccionValidator'
import { emailValidator } from '../helpers/emailValidator';
import axios from 'axios'
import { passwordValidator } from '../helpers/passwordValidator';

const props = {
    icon: require('../assets/icon.png')
}

export default function ActualizarEmpScreen({ route, navigation }) {
    const { idUser, correo, nombre, apellido, telefono } = route.params;
    const [name, setName] = React.useState("")
    const [apellido1, setApellido1] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [valueE, setValueE] = React.useState(1);


    const btnPressed = async () => {
        const nombreError = nameValidator(name.value)
        const telefonoError = telefonoValidator(phone.value)
        const emailError = emailValidator(email.value)
        const apellidoError = nameValidator(apellido1.value)
        const passwordError = passwordValidator(password.value)
        if (nombreError || telefonoError || emailError || apellidoError || passwordError) {
            setName({ ...name, error: nombreError })
            setPhone({ ...phone, error: telefonoError })
            setEmail({ ...email, error: emailError })
            setApellido1({ ...apellido1, error: apellidoError })
            setPassword({ ...password, error: passwordError })


        }
        else {
            axios.put("http://192.168.1.9:5000/api/usuarios/modificar?id=" + idUser, {
                correo: email.value,
                contrasena: password.value,
                nombre: name.value,
                apellido: apellido1.value,
                telefono: phone.value,
                activo: valueE

            })
                .then((response) => {
                    Alert.alert("MANDADITOS", "Tienda modificada con éxito.");
                    navigation.navigate('CRUDEmpleadosScreen');
                });
                console.log(valueE)
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Modificar Usuario" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <View style={styles.container}>
                    <List.Item
                        key={idUser}
                        title={correo}
                        description={nombre + " " + apellido + " " + telefono}
                        left={() => <List.Icon icon="calendar" />}
                    />
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
                        value={apellido1.value}
                        onChangeText={(text) => setApellido1({ value: text, error: '' })}
                        error={!!apellido1.error}
                        errorText={apellido1.error}
                    />
                    <TextInput
                        label="Teléfono"
                        keyboardType="numeric"
                        returnKeyType="next"
                        value={phone.value}
                        onChangeText={(text) => setPhone({ value: text, error: '' })}
                        error={!!phone.error}
                        errorText={phone.error}
                    />
                    <View>
                    <Title>Seleccione un estado:</Title>
                        <RadioButton.Group onValueChange={valueE => setValueE(valueE)} value={valueE}>
                            <RadioButton.Item label="Activo" value={1}/>
                            <RadioButton.Item label="Inactivo" value={0}/>
                        </RadioButton.Group>
                    </View>
                    <View style={styles.containerT}>
                        <Button color={theme.colors.primary} mode="contained" onPress={btnPressed}>
                            Actualizar</Button>
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