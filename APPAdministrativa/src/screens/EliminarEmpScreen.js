import React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native'
import { Appbar, List } from 'react-native-paper';
import { theme } from '../core/theme'
import axios from 'axios'
import { View } from 'react-native-web';

const props = {
    icon: require('../assets/icon.png')
}

export default function EliminarEmpScreen({ route, navigation }) {

    const [APIData, setAPIData] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://192.168.1.9:5000/api/usuarios/listarEmpleados')
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    if (!APIData) {
        Alert.alert("MANDADITOS", "No existe ningún empleado");
        navigation.goBack();
        return null;
    }
    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Modificar Empleados" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>

            <ScrollView>
                {APIData.map((element) => (
                     <List.Item onPress={() => navigation.navigate('DesactivarEmpScreen', {
                        idUser: element.id, correo: element.correo, nombre: element.nombre, apellido: element.apellido, 
                        telefono: element.telefono
                    })}
                        key={element.id}
                        title={element.correo}
                        description={element.nombre + " "+ element.apellido}
                        left={() => <List.Icon icon="calendar" />} 
                     />       
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