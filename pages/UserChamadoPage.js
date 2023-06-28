import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import {
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database'
import { init } from '../DAO/firebase'
import DaoChamados from '../DAO/DaoChamados'
import DaoUser from '../DAO/DaoUser'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AntDesign } from '@expo/vector-icons'
import { CommonActions } from '@react-navigation/native';

export default function UserChamadoPage({ route, navigation }) {
  const {
    routeId,
    routeSala,
    routeProtocolo,
    routeNome,
    routeTecnico,
    routeIdTecnico,
    routeStatus,
    routeProblema,
  } = route.params

  const daoChamados = new DaoChamados()
  const daoUser = new DaoUser()
  const db = getDatabase(init)

  const [problema, setProblema] = useState(routeProblema)
  const [sala, setSala] = useState(routeSala)
  const [usuario, setUsuario] = useState(routeNome)
  const [tecnico, setTecnico] = useState(routeTecnico)
  const [auxiliares, setAuxiliares] = useState([])
  const [status, setStatus] = useState(routeStatus)
  const [idTec, setIdTec] = useState(routeIdTecnico)
  const [excluindo, setExcluindo] = useState(0)

  useEffect(() => {
    onValue(
      query(
        ref(db, 'chamados/' + routeProtocolo + '/auxiliares'),
        orderByChild('nome'),
      ),
      (snapshot) => {
        setAuxiliares([])
        const data = snapshot.val()
        if (data !== null) {
          const auxArray = Object.values(data)
          setAuxiliares(auxArray)
        }
      },
    )
  }, [])
  

  async function excluirChamado(id){
    await daoChamados.excluirChamado(id).then(e=>
      alert(e),
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'PerfilPage', params:{ id: routeId} }],
        })
      )
    ).catch(a=>{
      alert(a)
    })
  }
 

  function ItemComponent({ items }) {
    return (
      <View style={styles.viewAux}>
        {items.map((item, index) => (
          <View key={index}>
            <Text>{item.nome} ||</Text>
          </View>
        ))}
      </View>
    )
  }
if(status === undefined){
  setStatus("")
}
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 70,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 30 }}
          >
            <AntDesign name="leftcircle" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Chamado: {routeProtocolo}</Text>
        </View>
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
          {tecnico != null ? <Text>{tecnico}</Text> : <Text>Sem Técnico</Text>}
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
          <Text>{status}</Text>
        </View>
        <View style={styles.viewOpcs}>
          <TouchableOpacity onPress={()=>{excluirChamado(routeProtocolo)}} style={styles.button}>
            <Text style={styles.buttonText}>Excluir Chamado</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewOpcs}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>[
              daoChamados.alterarChamado(routeProtocolo, problema, sala, status)
              ,setProblema(problema), setSala(sala)
            ]
            }
          >
            <Text style={styles.buttonText}>Alterar Chamado</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 16,
    width: '80%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 5,
  },
  button: {
    backgroundColor: 'blue',
    height: 40,
    width: 150,
    borderRadius: 8,
    marginTop: 10,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewOpcs: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  viewAux: {
    display: 'flex',
    flexDirection: 'row',
  },
})
