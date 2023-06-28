import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
<<<<<<< HEAD
import { AntDesign } from '@expo/vector-icons'; 
=======
import { AntDesign } from '@expo/vector-icons'

>>>>>>> d845d05d18d509569d5e792f224b281581b830e6
WebBrowser.maybeCompleteAuthSession();

export default function UserPage({route, navigation}) {

    const {id} = route.params;
  return (
    <View style={styles.container}>
<<<<<<< HEAD
      <View
          style={{
            marginLeft: 60,
            marginBottom: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              backgroundColor: "gray",
              height: 40,
              width: 40,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 30,
              borderRadius: 20,
            }}
          >
            <AntDesign name="left" size={24} color="black" />
=======
     <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 70,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 30 }}
          >
            <AntDesign name="leftcircle" size={30} color="black" />
>>>>>>> d845d05d18d509569d5e792f224b281581b830e6
          </TouchableOpacity>
          <Text style={styles.title}>Página do Usuário</Text>
        </View>
        <View style={styles.viewOpc}>
          <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('UserListPage',{id: id})}}><Text>Listar Meus Chamados</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('ChamadoFormPage',{id: id})}}><Text>Abrir Chamado</Text></TouchableOpacity>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewOpc:{
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  button:{
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2,
    width: 170,
    height: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },

});
