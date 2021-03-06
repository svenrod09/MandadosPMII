import React from 'react';
import { ScrollView, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph, RadioButton, Text } from 'react-native-paper';
import { theme } from '../core/theme'
import TextInput from '../components/TextInput'
import { nameValidator } from '../helpers/nameValidator'
import { cantidadValidator } from '../helpers/cantidadValidator';
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function ActualizarProductoScreen({ route, navigation }) {
    const { idproductos } = route.params;
    const [nombre, setNombre] = React.useState("")
    const [precio, setPrecio] = React.useState("")
    const [value, setValue] = React.useState(1);
    const [valueE, setValueE] = React.useState("DISPONIBLE");
    const [APIData, setAPIData] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://192.168.1.9:5000/api/tienda/listarActivas')
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
        if (nombreError || precioError) {
            setNombre({ ...nombre, error: nombreError })
            setPrecio({ ...precio, error: precioError })

        }
        else {
            axios.put("http://192.168.1.9:5000/api/productos/modificar?idproductos=" + idproductos, {
                    idproductos: idproductos,
                    nombreProducto: nombre.value,
                    precioProducto: precio.value,
                    estado: valueE,
                    idtienda: value
            })
                .then((response) => {
                    Alert.alert("MANDADITOS", "Producto modificada con éxito.");
                    navigation.navigate('CRUDProductosScreen');
                });
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Modificar Producto" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <View style={styles.container}>
                    <TextInput
                        label="Nombre del Producto"
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
                    <View>
                        <Title>Seleccione una tienda:</Title>
                        {APIData.map((element) => (
                            <RadioButton.Group key={element.idTienda} onValueChange={value => setValue(value)} value={value}>
                                <RadioButton.Item label={element.nombreTienda} value={element.idTienda} />
                            </RadioButton.Group>
                        ))}
                    </View>
                    <View>
                        <Title>Seleccione un estado:</Title>
                        <RadioButton.Group onValueChange={valueE => setValueE(valueE)} value={valueE}>
                            <RadioButton.Item label="DISPONIBLE" value={"DISPONIBLE"} />
                            <RadioButton.Item label="AGOTADO" value={"AGOTADO"} />
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