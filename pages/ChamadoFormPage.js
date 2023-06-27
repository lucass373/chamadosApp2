import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native'
import {
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database'
import { init } from '../DAO/firebase'
import Chamado from '../classes/Chamados'
import DaoChamados from '../DAO/DaoChamados'
import DaoUser from '../DAO/DaoUser'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AntDesign } from '@expo/vector-icons'

export default function ChamadoFormPage({ route, navigation }) {
  const {
    id,
  } = route.params

  const daoChamados = new DaoChamados()
  const daoUser = new DaoUser()
  const db = getDatabase(init)

  const [problema, setProblema] = useState(null)
  const [sala, setSala] = useState(null)
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [tecnico, setTecnico] = useState('')
  const [auxiliares, setAuxiliares] = useState([])
  const [status, setStatus] = useState(null)
  const [idTec, setIdTec] = useState('')



  useEffect(() => {
    onValue(
      query(ref(db, 'user/' + id), orderByChild('nome')),
      (snapshot) => {
        setUser(snapshot.val().nome)
        setEmail(snapshot.val().email)
      },
    )
  }, [id])


async function incluir(){
    const prot = await daoChamados.obterProt()
    const newProt = Number(prot) + 1;
    let chamado = new Chamado(newProt,problema,sala,null)
    let hoje = new Date()
    const dia = hoje.getDay() < 9? "0"+hoje.getDay() : hoje.getDay()   // O dia do mês
    const ano = hoje.getFullYear() // O ano com quatro dígitos
    const hora = hoje.getHours() < 9? "0"+hoje.getHours() : hoje.getHours()// A hora do dia
    const min = hoje.getMinutes() < 9? "0"+hoje.getMinutes() : hoje.getMinutes()  // O número de minutos desde a última hora
    const mes = hoje.getMonth() < 9? "0"+hoje.getMonth() : hoje.getMonth()// o mês do ano
    const dataComp = `${dia}/${mes}/${ano} ${hora}:${min}`
    
    daoChamados.incluir(user, email, chamado, dataComp).then(
        alert("Chamado incluído com sucesso!!"),
        setProblema(""),
        setSala(""),
    )

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
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginRight: 30 }}
          >
            <AntDesign name="leftcircle" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Abrir Chamado</Text>
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
          <Text>{user}</Text>
        </View>
      
       
       
        <View style={styles.viewOpcs}>
        <TouchableOpacity onPress={()=> incluir()} style={styles.button}>
            <Text style={styles.buttonText}>Abrir Chamado</Text>
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
