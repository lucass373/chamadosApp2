import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import DaoChamados from "../DAO/DaoChamados";
import { getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { init } from "../DAO/firebase";



WebBrowser.maybeCompleteAuthSession();

export default function UserListPage({ route, navigation }) {
  const db = getDatabase(init)
  const daoCham = new DaoChamados();
  const { id } = route.params; 
  const [chamados, setChamados] = useState([]);

   useEffect(() => {
    onValue(
      query(
        ref(db, 'chamados/'),
        orderByChild('protocolo'),equalTo("lucas.silvadeoliveira@soulasalle.com.br")
      ),
      (snapshot) => {
        setChamados([])
        const data = snapshot.val()
        if (data !== null) {
          const auxArray = Object.values(data)
          setChamados(auxArray)
        }
      },
    )
  }, [])


  
  return (
    <View style={styles.container}>
      <Text>Listar Meus Chamados</Text>
      {
    
      chamados.map((chamado, index) => (

        <TouchableOpacity key={index} style={styles.itemCham}
         onPress={()=>{navigation.navigate("ChamadoPage",{
          routeId : id, 
          routeProtocolo: chamado.protocolo, 
          routeNome: chamado.nome, 
          routeTecnico: chamado.tecnico,
          routeProblema:chamado.problema,
          routeStatus: chamado.status,
          routeSala: chamado.sala,
          })}}>
          <Text>Problema: {chamado.problema}</Text>
          <Text>Sala: {chamado.sala}</Text>
          <Text>Usuário: {chamado.nome}</Text>
          <Text>Status: {chamado.status}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  itemCham: {
    borderWidth: 1,
    width: "90%",
    marginBottom: 10,
    padding: 10,
  },
});
