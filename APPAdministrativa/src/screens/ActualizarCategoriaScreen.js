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

export default function ActualizarCategoriaScreen({ route, navigation }) {
    const { id } = route.params;
    const [nombre, setNombre] = React.useState("")
    const [valueE, setValueE] = React.useState(1);

    const btnPressed = async () => {
        const nombreError = nameValidator(nombre.value)
        if (nombreError) {
            setNombre({ ...nombre, error: nombreError })
        }
        else {
            axios.put("http://192.168.1.9:5000/api/categorias/modificar?id=" + id, {
                    id: id,
                    nombre: nombre.value,
                    activo: valueE
            })
                .then((response) => {
                    Alert.alert("MANDADITOS", "Categoría modificada con éxito.");
                    navigation.navigate('CRUDCategoriasScreen');
                });
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Modificar Categoría" />
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
                    <View>
                        <Title>Seleccione un estado:</Title>
                        <RadioButton.Group onValueChange={valueE => setValueE(valueE)} value={valueE}>
                            <RadioButton.Item label="Activo" value={1} />
                            <RadioButton.Item label="Inactivo" value={0} />
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