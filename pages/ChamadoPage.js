import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import DaoChamados from "../DAO/DaoChamados";
import DaoUser from "../DAO/DaoUser"

export default function ChamadoPage({ route, navigation }) {
  const {
    routeId,
    routeSala,
    routeProtocolo,
    routeNome,
    routeTecnico,
    routeAuxiliares,
    routeStatus,
    routeProblema,
  } = route.params;

  const daoChamados = new DaoChamados()
  const daoUser = new DaoUser()

  const [problema, setProblema] = useState(routeProblema);
  const [sala, setSala] = useState(routeSala);
  const [usuario, setUsuario] = useState(routeNome);
  const [tecnico, setTecnico] = useState(routeTecnico);
  const [auxiliares, setAuxiliares] = useState(routeAuxiliares.join(" || "));
  const [status, setStatus] = useState(routeStatus);
  const [numAux, setNumAux] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    daoChamados
      .obterNumAux(routeProtocolo)
      .then((num) => {
        setNumAux(num+1);
      })
      .catch((error) => {
        alert(error);
      });
    
    daoUser
    .obterUserPeloUid(routeId)
    .then((inf)=>{
      setUser(inf)
    })
    .catch((error)=>{
      alert(error)
    })

  }, []);
console.log(user)
  return (
    <ScrollView
      contentContainerStyle={{ alignItems: "center", paddingTop: 25 }}
    >
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
        <TextInput
          style={styles.input}
          placeholder="Auxiliares"
          value={auxiliares}
          onChangeText={setAuxiliares}
        />
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
        {
        routeTecnico != null ?
        <TouchableOpacity onPress={()=>{daoChamados.incluirAuxiliar(routeProtocolo,user.nome,numAux)}} style={styles.button} >
          <Text style={styles.buttonText}>Auxiliar chamado</Text>
        </TouchableOpacity>:
        <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Receber Chamado</Text>
      </TouchableOpacity>
    
        }
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Excluir Chamado</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewOpcs}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Alterar Chamado</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
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
});
