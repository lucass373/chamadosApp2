import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import DaoChamados from "../DAO/DaoChamados";
import DaoUser from "../DAO/DaoUser";
import { equalTo, getDatabase, onValue, orderByChild, query, ref } from "firebase/database";
import { init } from "../DAO/firebase";
import { AntDesign } from '@expo/vector-icons'


WebBrowser.maybeCompleteAuthSession();

export default function UserListPage({ route, navigation }) {
  const db = getDatabase(init)
  const daoCham = new DaoChamados();
  const daoUser = new DaoUser();
  const { id } = route.params; 
  const [chamados, setChamados] = useState([]);
  const [email, setEmail] = useState("");

  async function obterChamados(){
    const promisse = await daoUser.obterUserPeloUid(id)
    setEmail(promisse.email)
  }

  obterChamados()
   useEffect(() => {
    onValue(
      query(
        ref(db, 'chamados/'),
        orderByChild('email'),equalTo(email)
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
  }, [email])


  
  return (
    <View style={styles.container}>
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
          </TouchableOpacity>
          <Text style={styles.title}>Listar Meus Chamados</Text>
        </View>
      {
    
      chamados.map((chamado, index) => (

        <TouchableOpacity key={index} style={styles.itemCham}
         onPress={()=>{navigation.navigate("UserChamadoPage",{
          routeId : id, 
          routeProtocolo: chamado.protocolo, 
          routeNome: chamado.nome, 
          routeTecnico: chamado.tecnico,
          routeIdTec: chamado.idTecnico,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
