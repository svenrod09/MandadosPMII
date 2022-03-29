import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph, RadioButton, Text } from 'react-native-paper';
import { theme } from '../core/theme'
import TextInput from '../components/TextInput'
import { nameValidator } from '../helpers/nameValidator'
import { telefonoValidator } from '../helpers/telefonoValidator'
import { direccionValidator } from '../helpers/direccionValidator'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function NuevaTiendaScreen({ route, navigation }) {
    const [nombre, setNombre] = React.useState("")
    const [telefono, setTelefono] = React.useState("")
    const [direccion, setDireccion] = React.useState("")
    const [value, setValue] = React.useState(1);
    const [APIData, setAPIData] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://192.168.0.14:5000/api/categorias/listarActivas')
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    if (!APIData) {
        Alert.alert("MANDADITOS", "Primero ingrese una categoría.");
        navigation.goBack();
        return null;
    }

    const btnPressed = async () => {
        const nombreError = nameValidator(nombre.value)
        const telefonoError = telefonoValidator(telefono.value)
        const direccionError = direccionValidator(direccion.value)
        if (nombreError || telefonoError || direccionError) {
            setNombre({ ...nombre, error: nombreError })
            setTelefono({ ...telefono, error: telefonoError })
            setDireccion({ ...direccion, error: direccionError })
        }
        else {
            axios.post("http://192.168.0.14:5000/api/tienda/guardar", {
                nombre: nombre.value,
                telefono: telefono.value,
                direccion: direccion.value,
                categoria: value,
                activo: 1
            })
                .then((response) => {
                    Alert.alert("MANDADITOS", "Tienda agregada con éxito.");
                    navigation.goBack();
                });
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Agregar Tienda" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <View style={styles.container}> 
                    <TextInput
                        label="Nombre de la tienda"
                        returnKeyType="next"
                        value={nombre.value}
                        onChangeText={(text) => setNombre({ value: text, error: '' })}
                        error={!!nombre.error}
                        errorText={nombre.error}
                    />
                    <TextInput
                        label="Teléfono de la tienda"
                        keyboardType="numeric"
                        returnKeyType="next"
                        value={telefono.value}
                        onChangeText={(text) => setTelefono({ value: text, error: '' })}
                        error={!!telefono.error}
                        errorText={telefono.error}
                    />
                    <TextInput
                        label="Dirección de la tienda"
                        returnKeyType="next"
                        value={direccion.value}
                        onChangeText={(text) => setDireccion({ value: text, error: '' })}
                        error={!!direccion.error}
                        errorText={direccion.error}
                    />
                    <View>
                        <Title>Seleccione una categoría:</Title>
                        {APIData.map((element) => (
                            <RadioButton.Group key={element.idCategorias} onValueChange={value => setValue(value)} value={value}>
                                <RadioButton.Item label={element.nombre} value={element.idCategorias} />
                            </RadioButton.Group>
                        ))}
                    </View>
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