import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getDatabase,onValue, orderByChild, query, ref } from "firebase/database";
import { init } from "../DAO/firebase";
import DaoChamados from "../DAO/DaoChamados";
import DaoUser from "../DAO/DaoUser";

export default function ChamadoPage({ route, navigation }) {
  const {
    routeId,
    routeSala,
    routeProtocolo,
    routeNome,
    routeTecnico,
    routeStatus,
    routeProblema,
  } = route.params;

  const daoChamados = new DaoChamados();
  const daoUser = new DaoUser();
  const db = getDatabase(init);

  const [problema, setProblema] = useState(routeProblema);
  const [sala, setSala] = useState(routeSala);
  const [usuario, setUsuario] = useState(routeNome);
  const [tecnico, setTecnico] = useState(routeTecnico);
  const [auxiliares, setAuxiliares] = useState([]);
  const [status, setStatus] = useState(routeStatus);
  const [numAux, setNumAux] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    onValue(
      query(ref(db, "chamados/" + routeProtocolo + "/auxiliares"), orderByChild("nome")),
      (snapshot) => {
        setAuxiliares([]);
        const data = snapshot.val();
        if (data !== null) {
          const auxArray = Object.values(data);
          setAuxiliares(auxArray);
        }
      }
    );
  }, []);



  function ItemComponent({ items }) {
    return (
      <View style={styles.viewAux}>
        {items.map((item, index) => (
          <View key={index}>
            <Text>{item.nome} </Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chamado: {routeProtocolo}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Problema:</Text>
        <TextInput
          style={styles.input}
          placeholder="Problema"
          value={problema}
          onChangeText={setProblema}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Sala:</Text>
        <TextInput
          style={styles.input}
          placeholder="Sala"
          value={sala}
          onChangeText={setSala}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={usuario}
          onChangeText={setUsuario}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Técnico:</Text>
        <TextInput
          style={styles.input}
          placeholder="Técnico"
          value={tecnico}
          onChangeText={setTecnico}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Auxiliares:</Text>
        {auxiliares.length > 0 ? (
          <ItemComponent items={auxiliares} />
        ) : (
          <Text style={styles.title}>Sem Auxiliares</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Status:</Text>
        <TextInput
          style={styles.input}
          placeholder="Status"
          value={status}
          onChangeText={setStatus}
        />
      </View>
      <View style={styles.viewOpcs}>
        {routeTecnico != null ? (
          <TouchableOpacity
            onPress={() => {
              daoChamados.incluirAuxiliar(routeProtocolo, usuario.split(" ")[0], routeId);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Auxiliar chamado</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Receber Chamado</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Excluir Chamado</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewOpcs}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => daoChamados.alterarChamado(routeProtocolo, problema, sala)}
        >
          <Text style={styles.buttonText}>Alterar Chamado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Passar Chamado</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 16,
    width: "80%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 5,
  },
  button: {
    backgroundColor: "blue",
    height: 40,
    width: 150,
    borderRadius: 8,
    marginTop: 10,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  viewOpcs: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  },
  viewAux: {
    display: "flex",
    flexDirection: "row",
  },
});
