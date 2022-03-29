import React from 'react';
import { StyleSheet, View, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph, Text, RadioButton } from 'react-native-paper';
import { theme } from '../core/theme'
import TextInput from '../components/TextInput'
import { direccionValidator } from '../helpers/direccionValidator'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function PedidosScreen({ route, navigation }) {
    const { idproductos, nombreProducto, precioProducto, imagen, cantidad, idUsuario } = route.params;
    const [direccion, setDireccion] = React.useState("")

    const [value, setValue] = React.useState('Efectivo');

    const btnPressed = async () => {
        const direccionError = direccionValidator(direccion.value)
        if (direccionError) {
            setDireccion({ ...direccion, error: direccionError })
        }
        else {
            axios.post("http://192.168.0.12:5000/api/pedido/guardarPedido", {
                idUsuario: idUsuario,
                direccion: direccion.value,
                formapago: 'EFECTIVO',
                total: cantidad * precioProducto + 30
            })
                .then((response) => {
                    Alert.alert("MANDADITOS", "El Pedido ha sido procesado");
                    navigation.navigate("CategoryScreen", {idUsuario: idUsuario});
                });
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Detalle de Producto" />
        </Appbar.Header>
            <Card key={idproductos} style={styles.container} >
                <Card.Cover source={{ uri: 'http://192.168.0.12:5000/tienda/img/' + imagen }} />
                <Card.Content>
                    <Title>{nombreProducto}</Title>
                    <Paragraph>Precio: L{precioProducto}</Paragraph>
                </Card.Content>
            </Card>
            <View style={styles.containerT}>
                <Title>Pago</Title>
                <Text>Cantidad: {cantidad}</Text>
                <Text>SubTotal: L{precioProducto * cantidad}</Text>
                <Text>Total: L{cantidad * precioProducto + 30}</Text>
                <TextInput
                    label="Dirección de envío"
                    value={direccion.value}
                    onChangeText={(text) => setDireccion({ value: text, error: '' })}
                    error={!!direccion.error}
                    errorText={direccion.error}
                />
                <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                    <RadioButton.Item label="Efectivo" value="Efectivo" />
                </RadioButton.Group><Button color={theme.colors.primary} mode="contained" onPress={btnPressed}>
                    Procesar</Button>
            </View></>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,

    },
    containerT: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    colorPrimary: {
        backgroundColor: theme.colors.primary,
    },
    textPrimary: {
        color: theme.colors.primary,
    }
});