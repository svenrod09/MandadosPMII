import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'

const props = {
    icon: require('../assets/icon.png'),
    nuevo: require('../assets/nuevo.png'),
    listar: require('../assets/listar.webp'),
    modificar: require('../assets/modificar.png'),
    eliminar: require('../assets/eliminar.png'),
    cambiarimg: require('../assets/imagen.png')
}

export default function CRUDCategoriasScreen({ route, navigation }) {

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Gestión de Categorías" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('NuevaCategoriaScreen')}>
                        <Card.Cover source={props.nuevo} />
                        <Card.Content>
                            <Title>Añadir</Title>
                            <Paragraph>Añade una nueva categoría.</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('ListarCategoriaScreen')}>
                        <Card.Cover source={props.listar} />
                        <Card.Content>
                            <Title>Listar</Title>
                            <Paragraph>Lista las categorías disponibles.</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('ModificarCategoriaScreen')}>
                        <Card.Cover source={props.modificar} />
                        <Card.Content>
                            <Title>Modificar</Title>
                            <Paragraph>Modifica los datos de una categoría.</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('EliminarCategoriaScreen')}>
                        <Card.Cover source={props.eliminar} />
                        <Card.Content>
                            <Title>Eliminar</Title>
                            <Paragraph>Elimina los datos de una categoría.</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Card style={styles.container} onPress={() => navigation.navigate('AgregarImagenCScreen')}>
                        <Card.Cover source={props.cambiarimg} />
                        <Card.Content>
                            <Title>Añadir Imagen</Title>
                            <Paragraph>Añade la imagen de una categoría.</Paragraph>
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