import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar, Card, Title } from 'react-native-paper';
import { theme } from '../core/theme';
import axios from 'axios'

const props = {
  icon: require('../assets/icon.png')
}

export default function CategoryScreen({ navigation }) {
  const [APIData, setAPIData] = React.useState([]);
  React.useEffect(() => {
    axios.get('http://192.168.0.12:5000/api/categorias/listar')
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
            <Card key={element.idCategorias} style={styles.container} onPress={() => navigation.navigate('TiendasScreen', {id: element.idCategorias})}>
              <Card.Cover source={element.imagen}/>
              <Card.Content>
                <Title>{element.nombre}</Title>
              </Card.Content>
            </Card>
          ))}
        </TouchableOpacity>
      </ScrollView>

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