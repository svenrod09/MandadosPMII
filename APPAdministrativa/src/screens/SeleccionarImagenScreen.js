import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Appbar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
var FormData = require('form-data');

const props = {
    icon: require('../assets/icon.png')
}

export default function SeleccionarImagenScreen({ route, navigation }) {
    const { idTienda } = route.params;
    const [image, setImage] = React.useState(null);
    var form = new FormData();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
   
        if (!result.cancelled) {
            setImage(result.uri);
            form.append('photo', { uri: result.uri, name: result.uri.split('/').pop(), type: result.type+'/jpg' });
            console.log(form)

        }
    };

    const sendImage = async () => {
        if (!image) {
            Alert.alert("MANDADITOS", "Seleccione una imagen de la galería.");
        }
        else {
            axios.post("http://192.168.1.9:5000/api/archivos/img?id=" + idTienda,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    img: form,
                    params: {idTienda}

                })
                .then((response) => {
                    Alert.alert("MANDADITOS", "Imagen agregada con éxito.");
                    navigation.navigate('CRUDTiendasScreen');
                });
        }
    }

    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Action icon={props.icon} />
            <Appbar.Content title="Agregar Imagen" />
            <Appbar.Action icon="format-horizontal-align-left" onPress={() => navigation.replace("StartScreen")} />
        </Appbar.Header>
            <ScrollView>
                <View style={styles.containerT}>
                    {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
                </View>

                <View style={styles.containerT}>
                    <Button color={theme.colors.primary} mode="contained" onPress={pickImage}>
                        Seleccionar Imagen</Button>
                </View>

                <View style={styles.containerT}>
                    <Button color={theme.colors.primary} mode="contained" onPress={sendImage}>&nbsp;Almacenar Imagen </Button>
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