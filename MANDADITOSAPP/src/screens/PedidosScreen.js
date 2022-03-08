import * as React from 'react';
import { StyleSheet, View } from 'react-native'
import { Appbar, Button, Card, Dialog, Title, Paragraph, Text, RadioButton } from 'react-native-paper';
import { theme } from '../core/theme'

export default function PedidosScreen({ navigation }) {
    const [value, setValue] = React.useState('Efectivo');
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    return (
        <><Appbar.Header style={styles.colorPrimary}>
            <Appbar.BackAction onPress={() => navigation.replace('MenuScreen')} />
            <Appbar.Action icon={require('../assets/icon.png')} />
            <Appbar.Content title="Pedido" />
        </Appbar.Header>
            <Card style={styles.container}>
                <Card.Cover source={{ uri: require('../assets/big-clasic.png') }} />
                <Card.Content>
                    <Title>Big Classic</Title>
                    <Paragraph>L.150.00</Paragraph>
                </Card.Content>
            </Card>
            <View style={styles.containerT}>
                <Title>Pago</Title>
                <Text>SubTotal: L.150.00</Text>
                <Text>Total: L.175.00</Text>
                <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                    <RadioButton.Item label="Efectivo" value="Efectivo" />
                    <RadioButton.Item label="Tarjeta" value="Tarjeta" />
                </RadioButton.Group><Button color={theme.colors.primary} mode="contained" onPress={showDialog}>
                    Procesar</Button>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Pedido Procesado</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>El pedido ha sido procesado.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Ok</Button>
                    </Dialog.Actions>
                </Dialog></View></>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,

    },
    containerT: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    colorPrimary: {
        backgroundColor: theme.colors.primary,
    },
    textPrimary: {
        color: theme.colors.primary,
    }
});