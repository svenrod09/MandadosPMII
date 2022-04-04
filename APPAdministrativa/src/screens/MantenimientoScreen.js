import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'

const props = {
    icon: require('../assets/icon.png'),
    empleados: require('../assets/empleados.png'),
    categorias: require('../assets/categorias.png'),
    tiendas: require('../assets/tiendas.jpg'),
    productos: require('../assets/productos.webp')
}

export default function MantenimientoScreen({ route, navigation }) {

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Mantenimiento" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('CRUDEmpleadosScreen')}>
                        <Card.Cover source={props.empleados} />
                        <Card.Content>
                            <Title>Empleados</Title>
                            <Paragraph>Gesionar Empleados.</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('CRUDCategoriasScreen')}>
                        <Card.Cover source={props.categorias} />
                        <Card.Content>
                            <Title>Categorías</Title>
                            <Paragraph>Gesionar Categorías.</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('CRUDTiendasScreen')}>
                        <Card.Cover source={props.tiendas} />
                        <Card.Content>
                            <Title>Tiendas</Title>
                            <Paragraph>Gestionar Tiendas.</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('CRUDProductosScreen')}>
                        <Card.Cover source={props.productos} />
                        <Card.Content>
                            <Title>Productos</Title>
                            <Paragraph>Gestionar Productos.</Paragraph>
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