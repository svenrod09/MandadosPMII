import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function DesactivarProductoScreen({ route, navigation }) {
    const { idproductos, nombre, precio, cantidad, imagen } = route.params;

    const btnPressed = async () => {
        if (!idproductos) {
            Alert.alert("MANDADITOS", "Ocurrió un error al desactivar el producto.");
            navigation.goBack();
        }
        else {
            axios.put('http://192.168.1.9:5000/api/productos/eliminar?idproductos='+ idproductos, { params: { id: idproductos } })
            Alert.alert("MANDADITOS", "Producto desactivado con éxito.");
            navigation.navigate('CRUDProductosScreen');
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Eliminar Producto" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <Card style={styles.container} >
                    <Card.Cover source={{ uri: 'http://192.168.1.9:5000/producto/imgP/' + imagen }} />
                    <Card.Content>
                        <Title>Nombre del producto: {nombre}</Title>
                        <Paragraph>Precio: L{precio}</Paragraph>
                        <Paragraph>Estado: DISPONIBLE</Paragraph>
                    </Card.Content>
                </Card>
                <Button color={theme.colors.primary} mode="contained" onPress={btnPressed}>
                    Desactivar</Button>
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