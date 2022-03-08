import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'

export default function FarmaciaScreen({ navigation }) {
    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.replace('CategoryScreen')} />
            <Appbar.Action icon={require('../assets/icon.png')} />
            <Appbar.Content title="Farmacias" />
        </Appbar.Header>
            <TouchableOpacity>
                <Card style={styles.container} onPress={() => navigation.navigate('MenuScreen')}>
                    <Card.Cover source={{ uri: require('../assets/Siman.png') }} />
                    <Card.Content>
                        <Title>Farmacia Siman</Title>
                        <Paragraph>tu farmacia completa</Paragraph>
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