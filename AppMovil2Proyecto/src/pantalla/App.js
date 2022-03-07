import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';

export default function App() {
  const products = [
    {
      id: 1,
      name: 'Pollo',
      price: '$35.50',
      image: require('./assets/kfc.webp'),
    },
    {
      id: 2,
      name: 'Tacos',
      price: '$25',
      image: require('./assets/tacos.jpg'),
    },
    {
      id: 3,
      name: 'Hamburguesa',
      price: '$40.50',
      image: require('./assets/comida1.jpg'),
    },
    {
      id: 4,
      name: 'Pizza',
      price: '$12',
      image: require('./assets/pizza.jpg'),
    },
    {
      id: 5,
      name: 'Pasta',
      price: '$25',
      image: require('./assets/spaguetti.jpg'),
    },
  ];

  const oneProduct = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.imageContainer}>
      <Image style={styles.imagen} source={item.image}></Image>
    </View>
    <Text style={styles.names}>{item.name}{"\n"}{"\n"}{item.price}</Text>
  </View>
  )
  headerComponent = () => {
    return <Text style={styles.titulo}>Productos</Text>
  }

  itemSeparator = () => {
    return <View style={styles.separator} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Productos</Text>  
      <FlatList
        ListHeaderComponentStyle={styles.listHeader}
        //ListHeaderComponent={headerComponent}
        data={products}
        renderItem={oneProduct}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<Text>Lista de productos</Text>}
      />
    </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E1E4E5',
    width: '100%',
    marginTop: StatusBar.currentHeight || 0,
    padding:5,
    
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCC',
  },
  listHeader: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',

  },
  titulo: {
    fontSize: 21,
    fontWeight: 'bold',  
    height:40,
    width: '100%',
    backgroundColor:'#0002'
  },
  imageContainer:{
    backgroundColor:'#D9D9D9',
    height:89,
    width:89,
    justifyContent:'center',
    alignItems:'center',
  },
  names:{
    fontWeight:'600',
    fontSize:16,
    marginLeft:25,
    color:"#0009"
  },
  imagen:{
    width: '100%',
    height: 89
  },
  item:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:13,
  },
});