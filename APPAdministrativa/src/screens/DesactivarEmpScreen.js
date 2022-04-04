import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph, List } from 'react-native-paper';
import { theme } from '../core/theme'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function DesactivarEmpScreen({ route, navigation }) {
    const { idUser, apellido, nombre, telefono, correo } = route.params;

    const btnPressed = async () => {
        if (!idUser) {
            Alert.alert("MANDADITOS", "Ocurrió un error al desactivar la tienda.");
            navigation.goBack();
        }
        else {
            axios.put('http://192.168.1.9:5000/api/usuarios/deshabilitar?id=' + idUser, {id: idUser})
                Alert.alert("MANDADITOS", "Usuario Deshabilitado.");
                navigation.navigate('CRUDEmpleadosScreen');
           
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Eliminar Empleado" />
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
                <View style={styles.containerT}>
                    <Button color={theme.colors.primary} mode="contained" onPress={btnPressed}>
                        Deshabilitar</Button>
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