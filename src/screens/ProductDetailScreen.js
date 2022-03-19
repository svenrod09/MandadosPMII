import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'
import TextInput from '../components/TextInput'
import { cantidadValidator } from '../helpers/cantidadValidator'

const props = {
    icon: require('../assets/icon.png')
}

export default function ProductDetailScreen({ route, navigation }) {
    const { idproductos, nombreProducto, precioProducto, imagen } = route.params;
    const [cantidad, setCantidad] = React.useState("")

    const btnPressed = async () => {
        const cantidadError = cantidadValidator(cantidad.value)
        if (cantidadError) {
          setCantidad({ ...cantidad, error: cantidadError })      
        }
        else{
            Alert.alert("MANDADITOS", cantidad.value) 
        }
    }
    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Detalle de Producto" />
        </Appbar.Header>

            <ScrollView>
                <TouchableOpacity>
                    <Card key={idproductos} style={styles.container} >
                        <Card.Cover source={imagen} />
                        <Card.Content>
                            <Title>{nombreProducto}</Title>
                            <Paragraph>Precio: L{precioProducto}</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                <View style={styles.containerT}>
                    <TextInput
                        label="Cantidad"
                        keyboardType="numeric"
                        value={cantidad.value}
                        onChangeText={(text) => setCantidad({ value: text, error: '' })}
                        error={!!cantidad.error}
                        errorText={cantidad.error}
                    />
                    <Button color={theme.colors.primary} mode="contained" onPress={btnPressed}>Agregar al Carrito</Button>
                </View>
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