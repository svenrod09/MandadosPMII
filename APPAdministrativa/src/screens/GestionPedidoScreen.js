import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'

const props = {
    icon: require('../assets/icon.png'),
    asignar: require('../assets/asignar.png'),
    cancelar: require('../assets/cancelar.webp'),
    listar: require('../assets/listar.webp')
}

export default function GestionPedidoScreen({ route, navigation }) {

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Gestión de Pedidos" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('AsignarPedidoScreen')}>
                        <Card.Cover source={props.asignar} />
                        <Card.Content>
                            <Title>Asignar Pedido</Title>
                            <Paragraph>Asigna un empleado para entregar pedido.</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('CancelarPedidoScreen')}>
                        <Card.Cover source={props.cancelar} />
                        <Card.Content>
                            <Title>Cancelar Pedido</Title>
                            <Paragraph>Cancela un pedido.</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('ListarPedidos')}>
                        <Card.Cover source={props.listar}/>
                        <Card.Content>
                            <Title>Listar Pedidos</Title>
                            <Paragraph>Lista de todos lo Pedidos.</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
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