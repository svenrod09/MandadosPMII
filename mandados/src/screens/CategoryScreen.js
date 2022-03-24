import React from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar, Card, Title, IconButton } from 'react-native-paper';
import { theme } from '../core/theme';
import axios from 'axios'

const props = {
  icon: require('../assets/icon.png')
}

export default function CategoryScreen({ route, navigation }) {
  const { idUsuario, token } = route.params;
  const [APIData, setAPIData] = React.useState([]);
  React.useEffect(() => {
    axios.get('http://192.168.0.12:5000/api/categorias/listar',
    { headers: {"Authorization" : `Bearer ${token}`} }
    )

      .then((response) => {
        setAPIData(response.data);
      });
  }, []);

  if (!APIData) return null;


  return (
    <>
      <Appbar.Header style={styles.colorPrimary}>
        <Appbar.Action icon={props.icon} />
        <Appbar.Content title="Categorías" />
      </Appbar.Header>

      <ScrollView>
        <TouchableOpacity>
          {APIData.map((element) => (
            <Card key={element.idCategorias} style={styles.container} onPress={() => navigation.navigate('TiendasScreen', { id: element.idCategorias, idUsuario: idUsuario })}>
              <Card.Cover source={{ uri: 'http://192.168.0.12:5000/tienda/img/' + element.imagen }} />
              <Card.Content>
                <Title>{element.nombre}</Title>
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
  )
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