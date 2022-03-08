import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'

export default function MenuScreen({ navigation }) {
    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.replace('RestaurantScreen')} />
            <Appbar.Action icon={require('../assets/icon.png')} />
            <Appbar.Content title="Wendy's" />
        </Appbar.Header>
        <TouchableOpacity>

            <Card style={styles.container} onPress={() => navigation.navigate('PedidosScreen')}>
                <Card.Cover source={{ uri: require('../assets/big-clasic.png') }} />
                <Card.Content>
                    <Title>Big Classic</Title>
                    <Paragraph>L.150.00</Paragraph>
                </Card.Content>
            </Card>
            </TouchableOpacity>
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