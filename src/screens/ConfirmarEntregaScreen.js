import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png'),
    pedido: require('../assets/pedido.webp')
}

export default function ConfirmarEntregaScreen({ route, navigation }) {
    const {id, idDetalle} = route.params;
    const [APIData, setAPIData] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://192.168.0.11:5000/api/pedido/listarAsignados', { params: {id:id} })
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    if (!APIData) {
        Alert.alert("MANDADITOS", "No existe ningún pedido asignado.");
        navigation.goBack();
        return null;
    }

    const btnPressed = async () => {
        if (!id) {
            Alert.alert("MANDADITOS", "No se encontró el pedido.");
            navigation.navigate('EmpleadoScreen');
        }
        else {
            axios.put("http://192.168.0.11:5000/api/detalle/modificar?id="+idDetalle, {
                idDetalle: idDetalle,
                activo: 1
            })
                .then((response) => {
                    axios.put("http://192.168.0.11:5000/api/pedido/entregarPedido?idPedido="+id, {
                        idpedido: idPedido
                    })
                    Alert.alert("MANDADITOS", "Pedido entregado con éxito.");
                    navigation.navigate('EmpleadoScreen');
                });
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Entregar Pedido" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <TouchableOpacity>
                    {APIData.map((element) => (
                        <Card key={element.idDetalle} style={styles.container}>
                            <Card.Cover source={props.pedido} />
                            <Card.Content>
                                <Title>Pedido #: {element.idPedido}</Title>
                                <Paragraph>Fecha del pedido: {element.hora}</Paragraph>
                                <Paragraph>Dirección de entrega: {element.direccion}</Paragraph>
                                <Paragraph>Total: L{element.total}</Paragraph>
                                <Paragraph>Forma de Pago: {element.formapago}</Paragraph>
                                <Paragraph>Estado: Asignado</Paragraph>
                            </Card.Content>
                        </Card>
                    ))}
                </TouchableOpacity>
                <View style={styles.containerT}>
                    <Title>Confirme la Entrega del Pedido:</Title>
                    <Button color={theme.colors.primary} mode="contained" onPress={btnPressed}>
                        Confirmar Entrega</Button>
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