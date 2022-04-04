import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph, RadioButton, Text } from 'react-native-paper';
import { theme } from '../core/theme'
import TextInput from '../components/TextInput'
import { nameValidator } from '../helpers/nameValidator'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function NuevaCategoriaScreen({ route, navigation }) {
    const [nombre, setNombre] = React.useState("")

    const btnPressed = async () => {
        const nombreError = nameValidator(nombre.value)

        if (nombreError) {
            setNombre({ ...nombre, error: nombreError })
        }
        else {
            axios.post("http://192.168.1.9:5000/api/categorias/guardar", {
                nombreCategoria: nombre.value,
                activo: 1
            })
                .then((response) => {
                    Alert.alert("MANDADITOS", "Categoría agregada con éxito.");
                    navigation.goBack();
                });
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Agregar Categoría" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <View style={styles.container}> 
                    <TextInput
                        label="Nombre de la categoría"
                        returnKeyType="next"
                        value={nombre.value}
                        onChangeText={(text) => setNombre({ value: text, error: '' })}
                        error={!!nombre.error}
                        errorText={nombre.error}
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