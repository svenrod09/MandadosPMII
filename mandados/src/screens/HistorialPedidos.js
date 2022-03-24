import React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native'
import { Appbar, List } from 'react-native-paper';
import { theme } from '../core/theme'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function HistorialPedidos({ route, navigation }) {
    const { idUsuario } = route.params;
    const [APIData, setAPIData] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://192.168.0.12:5000/api/pedido/listarXUsuario', { params: { id: idUsuario } })
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    if (!APIData) {
        Alert.alert("MANDADITOS", "No ha realizado ningún pedido");
        navigation.goBack();
        return null;
    }
    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Historial de Pedidos" />
        </Appbar.Header>

            <ScrollView>
                {APIData.map((element) => (
                   <List.Section key={element.idPedido}>
                    <List.Item title={element.hora} 
                    description={"Total: L" + element.total + ", Estado del pedido: " + element.estado}
                    left={() => <List.Icon icon="calendar" />} />
                  </List.Section>
                ))}
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
    },
    colorPrimary: {
        backgroundColor: theme.colors.primary,
    },
    textPrimary: {
        color: theme.colors.primary,
    }
});