import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph, RadioButton, Text } from 'react-native-paper';
import { theme } from '../core/theme'
import TextInput from '../components/TextInput'
import { nameValidator } from '../helpers/nameValidator'
import { direccionValidator } from '../helpers/direccionValidator'
import { cantidadValidator } from '../helpers/cantidadValidator'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function AgregarProductoScreen ({ route, navigation }) {
    //nombreProducto , precioProducto,cantidad, estado,idtienda
    const [nombre, setNombre] = React.useState("")
    const [precio, setPrecio] = React.useState("")
    const [cantidad, setCantidad] = React.useState("")
    const [value, setValue] = React.useState(1);
    const [APIData, setAPIData] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://192.168.0.24:5000//api/tienda/listarActivas')
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    if (!APIData) {
        Alert.alert("MANDADITOS", "Primero ingrese una tienda.");
        navigation.goBack();
        return null;
    }

    const btnPressed = async () => {
        const nombreError = nameValidator(nombre.value)
        const precioError = cantidadValidator(precio.value)
        const cantidadError = cantidadValidator(cantidad.value)
        if (nombreError || precioError || cantidadError) {
            setNombre({ ...nombre, error: nombreError })
            setTelefono({ ...precio, error: precioError })
            setDireccion({ ...cantidad, error: cantidadError })
        }
        else {
            axios.post("http://192.168.0.24:5000/api/productos/guardar", {
                nombreProducto: nombre.value,
                precioProducto: precio.value,
                cantidad: cantidad.value,
                estado: 'DISPONIBLE',
                idtienda: value
                
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
            <Appbar.Content title="Agregar Producto" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <View style={styles.container}> 
                    <TextInput
                        label="Nombre del producto"
                        returnKeyType="next"
                        value={nombre.value}
                        onChangeText={(text) => setNombre({ value: text, error: '' })}
                        error={!!nombre.error}
                        errorText={nombre.error}
                    />
                    <TextInput
                        label="Precio"
                        keyboardType="numeric"
                        returnKeyType="next"
                        value={precio.value}
                        onChangeText={(text) => setPrecio({ value: text, error: '' })}
                        error={!!precio.error}
                        errorText={precio.error}
                    />
                    <TextInput
                        label="Cantidad"
                        keyboardType="numeric"
                        returnKeyType="next"
                        value={cantidad.value}
                        onChangeText={(text) => setCantidad({ value: text, error: '' })}
                        error={!!cantidad.error}
                        errorText={cantidad.error}
                    />
                    <View>
                        <Title>Seleccione una Tienda:</Title>
                        {APIData.map((element) => (
                            <RadioButton.Group key={element.idTienda} onValueChange={value => setValue(value)} value={value}>
                                <RadioButton.Item label={element.nombreTienda} value={element.idTienda} />
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