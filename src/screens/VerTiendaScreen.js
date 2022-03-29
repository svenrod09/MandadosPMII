import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'

const props = {
    icon: require('../assets/icon.png')
}

export default function VerTiendaScreen({ route, navigation }) {
    const { id, nombre, telefono, direccion, imagen } = route.params;

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Listar Tienda" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
        <ScrollView>
            <Card key={id} style={styles.container} >
              <Card.Cover source={{ uri: 'http://192.168.0.14:5000/tienda/img/' + imagen }} />
              <Card.Content>
                <Title>Nombre de la tienda: {nombre}</Title>
                <Paragraph>Teléfono: {telefono}</Paragraph>
                <Paragraph>Dirección: {direccion}</Paragraph>
                <Paragraph>Estado: Activo</Paragraph>
              </Card.Content>
            </Card>
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