import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph, RadioButton } from 'react-native-paper';
import { theme } from '../core/theme'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png'),
    pedido: require('../assets/pedido.webp')
}

export default function PedidoCanceladoScreen({ route, navigation }) {
    const { idPedido, hora, direccion, total, formapago } = route.params;

    const btnPressed = async () => {
        if (!idPedido) {
            Alert.alert("MANDADITOS", "No se encontró el pedido.");
            navigation.navigate();
        }
        else {
            axios.put("http://192.168.1.9:5000/api/pedido/cancelarPedido?idPedido="+idPedido, {
                idpedido: idPedido,
            })
                .then((response) => {
                    Alert.alert("MANDADITOS", "Pedido cancelado con éxito.");
                    navigation.navigate('GestionPedidoScreen');
                });
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Cancelar Pedido" />
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
                    <Button color={theme.colors.primary} mode="contained" onPress={btnPressed}>
                        Cancelar</Button>
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