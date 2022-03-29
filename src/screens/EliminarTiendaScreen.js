import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function EliminarTiendaScreen({ route, navigation }) {
    const [APIData, setAPIData] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://192.168.0.14:5000/api/tienda/listarActivas')
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    if (!APIData) {
        Alert.alert("MANDADITOS", "No existen ninguna tienda.");
        navigation.goBack();
        return null;
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Eliminar Tienda" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
        <ScrollView>
        <TouchableOpacity>
          {APIData.map((element) => (
            <Card key={element.idTienda} style={styles.container} onPress={() => navigation.navigate('DesactivarTiendaScreen', { idTienda: element.idTienda, 
            nombre: element.nombreTienda, telefono: element.telefono, direccion: element.direccion, imagen: element.imagen })}>
              <Card.Cover source={{ uri: 'http://192.168.0.14:5000/tienda/img/' + element.imagen }} />
              <Card.Content>
                <Title>{element.nombreTienda}</Title>
              </Card.Content>
            </Card>
          ))}
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