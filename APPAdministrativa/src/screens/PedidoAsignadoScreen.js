import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph, RadioButton } from 'react-native-paper';
import { theme } from '../core/theme'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png'),
    pedido: require('../assets/pedido.webp')
}

export default function PedidoAsignadoScreen({ route, navigation }) {
    const { idPedido, hora, direccion, total, formapago } = route.params;
    const [APIData, setAPIData] = React.useState([]);
    const [value, setValue] = React.useState();

    React.useEffect(() => {
        axios.get('http://192.168.1.9:5000/api/usuarios/listarEmpleados')
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    if (!APIData) {
        Alert.alert("MANDADITOS", "No existe ningún empleado.");
        navigation.goBack();
        return null;
    }

    const btnPressed = async () => {
        if (!value) {
            Alert.alert("MANDADITOS", "Seleccione un empleado.");
        }
        else {
            axios.post("http://192.168.1.9:5000/api/detalle/guardar", {
                idpedido: idPedido,
                idempleado: value
            })
                .then((response) => {
                    axios.put("http://192.168.1.9:5000/api/pedido/asignarPedido?idPedido="+idPedido, {
                        idpedido: idPedido
                    })
                    Alert.alert("MANDADITOS", "Pedido asignado con éxito.");
                    navigation.navigate('GestionPedidoScreen');
                });
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Asignar Pedido" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <TouchableOpacity>
                    <Card key={idPedido} style={styles.container} >
                        <Card.Cover source={props.pedido} />
                        <Card.Content>
                            <Title>Pedido #: {idPedido}</Title>
                            <Paragraph>Fecha del pedido: {hora}</Paragraph>
                            <Paragraph>Dirección de entrega: {direccion}</Paragraph>
                            <Paragraph>Total: L{total}</Paragraph>
                            <Paragraph>Forma de Pago: {formapago}</Paragraph>
                            <Paragraph>Estado: Activo</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <View style={styles.containerT}>
                    <Title>Seleccione un empleado:</Title>
                    {APIData.map((element) => (
                        <RadioButton.Group key={element.id} onValueChange={value => setValue(value)} value={value}>
                            <RadioButton.Item label={element.nombre + ' ' + element.apellido} value={element.id} />
                        </RadioButton.Group>
                    ))}
                    <Button color={theme.colors.primary} mode="contained" onPress={btnPressed}>
                        Asignar</Button>
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