import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import DaoChamados from "../DAO/DaoChamados";

WebBrowser.maybeCompleteAuthSession();

export default function ListPage({ route, navigation }) {
  const daoCham = new DaoChamados();
  const { id } = route.params; 
  const [chamados, setChamados] = useState([]);

  useEffect(() => {
    daoCham
      .obterChamadosFiltradoTec()
      .then((list) => {
        setChamados(list);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Listar Chamados</Text>
      {chamados.map((chamado, index) => (
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
          <Text>Técnico: {chamado.tecnico}</Text>
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
