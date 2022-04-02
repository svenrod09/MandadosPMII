import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function DesactivarCategoriaScreen({ route, navigation }) {
    const { id, nombre, imagen } = route.params;

    const btnPressed = async () => {
        if (!id) {
            Alert.alert("MANDADITOS", "Ocurrió un error al desactivar la categoría.");
            navigation.goBack();
        }
        else {
            axios.put('http://192.168.0.11:5000/api/categorias/eliminar?id='+id, { params: { id: id } })
            Alert.alert("MANDADITOS", "Categoría desactivada con éxito.");
            navigation.navigate('CRUDCategoriasScreen');
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Eliminar Categoría" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <Card style={styles.container} >
                    <Card.Cover source={{ uri: 'http://192.168.0.11:5000/categorias/imgC/' + imagen }} />
                    <Card.Content>
                        <Title>Nombre de la categoría: {nombre}</Title>
                        <Paragraph>Estado: Activo</Paragraph>
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