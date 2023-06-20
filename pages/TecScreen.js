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
import { AntDesign } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

export default function TecScreen({ route, navigation }) {
  const { id } = route.params;
  return (
    <View style={styles.container}>
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
          </TouchableOpacity>
          <Text style={styles.title}>Pagina Técnico</Text>
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
    height: 40,
  },

});
