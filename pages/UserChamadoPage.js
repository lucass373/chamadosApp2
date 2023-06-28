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
<<<<<<< HEAD
import { AntDesign } from '@expo/vector-icons'; 

export default function UserChamadoPage({ route, navigation }) {
  const {
    routeSala,
    routeProtocolo,
    routeNome,
=======
import { AntDesign } from '@expo/vector-icons'

export default function UserChamadoPage({ route, navigation }) {
  const {
    routeId,
    routeSala,
    routeProtocolo,
    routeNome,
    routeTecnico,
>>>>>>> d845d05d18d509569d5e792f224b281581b830e6
    routeStatus,
    routeProblema,
  } = route.params

  const daoChamados = new DaoChamados()
  const daoUser = new DaoUser()
  const db = getDatabase(init)

  const [problema, setProblema] = useState(routeProblema)
  const [sala, setSala] = useState(routeSala)
  const [usuario, setUsuario] = useState(routeNome)
  const [tecnico, setTecnico] = useState('')
  const [auxiliares, setAuxiliares] = useState([])
  const [status, setStatus] = useState('')
  const [idTec, setIdTec] = useState('')
<<<<<<< HEAD
  const [user, setUser] = useState({})
=======
  const [excluindo, setExcluindo] = useState(0)
>>>>>>> d845d05d18d509569d5e792f224b281581b830e6

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

  useEffect(() => {
<<<<<<< HEAD
    onValue(
      query(ref(db, 'chamados/' + routeProtocolo), orderByChild('tecnico')),
      (snapshot) => {
        setStatus(snapshot.val().status)
        setTecnico(snapshot.val().tecnico)
        setIdTec(snapshot.val().idTecnico)
      },
    )
  }, [])

 

  
  

=======
    if(excluindo === 0){
      console.log(excluindo)
    onValue(
      query(ref(db, 'chamados/' + routeProtocolo), orderByChild('tecnico')),
      (snapshot) => {
        
        
          console.log("setting")
          setTecnico(snapshot.val().tecnico)
          setIdTec(snapshot.val().idTecnico)
          setStatus(snapshot.val().status)
        }
      
    )
      }else{
        console.log("exclui")
      }
  }, [excluindo])


  async function excluirChamado(id){
    setExcluindo(1)
    await daoChamados.excluirChamado(id).then(e=>
      alert(e),
      navigation.goBack()
    ).catch(a=>{
      alert(a)
    })
  }
 

>>>>>>> d845d05d18d509569d5e792f224b281581b830e6
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
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
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 30 }}
          >
            <AntDesign name="leftcircle" size={30} color="black" />
>>>>>>> d845d05d18d509569d5e792f224b281581b830e6
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
<<<<<<< HEAD
          <TouchableOpacity style={styles.button}>
=======
          <TouchableOpacity onPress={()=>{[excluirChamado(routeProtocolo)]}} style={styles.button}>
>>>>>>> d845d05d18d509569d5e792f224b281581b830e6
            <Text style={styles.buttonText}>Excluir Chamado</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewOpcs}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              daoChamados.alterarChamado(routeProtocolo, problema, sala, status)
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
