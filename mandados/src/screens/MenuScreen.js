import * as React from 'react';
import { StyleSheet } from 'react-native'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'

export function MenuScreen({ navigation }) {
    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.replace('RestaurantScreen')} />
            <Appbar.Content title="Wendy's" />
        </Appbar.Header>
            <Card style={styles.container}>
                <Card.Cover source={{ uri: require('../assets/big-clasic.png') }} />
                <Card.Content>
                    <Title>Big Classic</Title>
                    <Paragraph>L.150.00</Paragraph>
                </Card.Content>
            </Card></>
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