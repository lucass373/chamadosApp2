import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
<<<<<<< HEAD
import { AntDesign } from "@expo/vector-icons";
=======
import { AntDesign } from '@expo/vector-icons'
>>>>>>> d845d05d18d509569d5e792f224b281581b830e6

WebBrowser.maybeCompleteAuthSession();

export default function TecScreen({ route, navigation }) {
  const { id } = route.params;
  return (
    <View style={styles.container}>
       <View
          style={{
<<<<<<< HEAD
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
          </TouchableOpacity>
          <Text style={styles.title}>Pagina Técnico</Text>
=======
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
          <Text style={styles.title}>Página do Técnico</Text>
        </View>
        <View style={styles.viewOpc}>
          <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('ListPage',{id: id})}}><Text>Listar Chamados</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Text>Listar Usuários</Text></TouchableOpacity>
>>>>>>> d845d05d18d509569d5e792f224b281581b830e6
        </View>
      <View style={styles.viewOpc}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("ListPage", { id: id });
          }}
        >
          <Text>Listar Chamados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Listar Usuários</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
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
  viewOpc: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  button: {
    borderRadius: 20,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 2,
    width: 170,
<<<<<<< HEAD
    height: 40,
=======
    height: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
>>>>>>> d845d05d18d509569d5e792f224b281581b830e6
  },

});
