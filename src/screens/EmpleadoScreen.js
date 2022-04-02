import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'

const props = {
    icon: require('../assets/icon.png'),
    entrega: require('../assets/entrega.webp')
}

export default function EmpleadoScreen({ route, navigation }) {

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Empleado" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
        <ScrollView>
        <TouchableOpacity>
                <Card style={styles.container} onPress={() => navigation.navigate('EntregaPedidoScreen') }>
                    <Card.Cover source={props.entrega} />
                    <Card.Content>
                        <Title>Entregar Pedido</Title>
                        <Paragraph>Confirma la entrega de un pedido asignado.</Paragraph>
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