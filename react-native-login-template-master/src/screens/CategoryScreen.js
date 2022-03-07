import * as React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Appbar, Card, Title } from 'react-native-paper';
import { theme } from '../core/theme'

export default function CategoryScreen({ navigation }) {
    return (
      <><Appbar.Header style={styles.colorPrimary}>
          <Appbar.Action icon={require('../assets/icon.png')} />
        <Appbar.Content title="Categorías"/>
      </Appbar.Header>
      <TouchableOpacity>
      <Card style={styles.container} onPress={() => navigation.navigate('RestaurantScreen')}>
          <Card.Cover source={{ uri: require('../assets/restaurantes.jpg') }} />
          <Card.Content>
            <Title>Restaurantes</Title>
          </Card.Content>
        </Card>

        <Card style={styles.container} onPress={() => navigation.navigate('FarmaciaScreen')}>
          <Card.Cover source={{ uri: require('../assets/farmacia.jpg') }} />
          <Card.Content>
            <Title>Farmacia</Title>
          </Card.Content>
        </Card>
        <Card style={styles.container} onPress={() => navigation.navigate('ConvenienciaScreen')}>
          <Card.Cover source={{ uri: require('../assets/conveniencia.jpg') }} />
          <Card.Content>
            <Title>Conveniencia</Title>
          </Card.Content>
        </Card>
      </TouchableOpacity></>
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