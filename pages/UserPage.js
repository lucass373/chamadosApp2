import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export default function UserPage({route, navigation}) {

    const {id} = route.params;
  return (
    <View style={styles.container}>
     <Text>Tecnico page</Text>
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
  }

});
