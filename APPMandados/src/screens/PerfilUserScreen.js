import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import axios from 'axios'

export default function PerfilScreen({ navigation }) { 
        const { id } = route.params;
        const [APIData, setAPIData] = React.useState([]);
        React.useEffect(() => {
            axios.get('http://192.168.1.9:5000/api/tienda/listarXCategoria', { params: { id: id } })
                .then((response) => {
                    setAPIData(response.data);
                });
        }, []);
    
    if (!APIData) return null;

  return (
    <><Appbar.Header style={styles.colorPrimary}>
    <Appbar.BackAction onPress={() => navigation.goBack()} />
    <Appbar.Action icon={props.icon} />
    <Appbar.Content title="Perfil" />
    </Appbar.Header>


    <ScrollView>
        <TouchableOpacity>
          {APIData.map((element) => (
            <TextInput
                returnKeyType={"done"}  
                value={respone.correo}
            />
            
          ))}
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 0
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  container:{
    padding: 15,
    marginTop: 50,
  }
})
