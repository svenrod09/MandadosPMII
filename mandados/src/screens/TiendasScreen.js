import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Appbar, Card, Title, IconButton} from 'react-native-paper';
import { theme } from '../core/theme'
import axios from 'axios'

const props = {
    icon: require('../assets/icon.png')
}

export default function TiendasScreen({ route, navigation }) {
    const { id, idUsuario } = route.params;
    const [APIData, setAPIData] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://192.168.0.12:5000/api/tienda/listarXCategoria', { params: { id: id } })
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    if (!APIData) return null;
    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Tiendas" />
        </Appbar.Header>

            <ScrollView>
                <TouchableOpacity>
                    {APIData.map((element) => (
                        <Card key={element.idTienda} style={styles.container} onPress={() => navigation.navigate('MenuScreen', { id: element.idTienda, idUsuario: idUsuario })}>
                            <Card.Cover source={{ uri: 'http://192.168.0.12:5000/tienda/img/' + element.imagen }} />
                            <Card.Content>
                                <Title>{element.nombreTienda}</Title>
                            </Card.Content>
                        </Card>
                    ))}
                </TouchableOpacity>
            </ScrollView>
            <IconButton
                icon="calendar-clock"
                color={theme.colors.primary} 
                size={30}
                onPress={() => navigation.navigate('HistorialPedidos', {idUsuario: idUsuario})}
            />
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