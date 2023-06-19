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

export default function ChamadoPage({ route, navigation }) {
  const {
    routeId,
    routeSala,
    routeProtocolo,
    routeNome,
    routeTecnico,
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
  const [status, setStatus] = useState(routeStatus)
  const [idTec, setIdTec] = useState('')
  const [user, setUser] = useState({})

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
    onValue(
      query(ref(db, 'chamados/' + routeProtocolo), orderByChild('tecnico')),
      (snapshot) => {
        setTecnico(snapshot.val().tecnico)
        setIdTec(snapshot.val().idTecnico)
      },
    )
  }, [])

  function excluirAux(uid) {
    console.log("aaaaaa")
    daoChamados.obterAuxPeloUid(uid, routeProtocolo).then((e) => {
      daoChamados.excluirAux(routeProtocolo, e.num).then((a) => {
        if (a) {
          alert('auxiliar excluido')
        }
      })
    })
  }

  async function incluirTec() {
    const inf = await daoUser.obterUserPeloUid(routeId)
    daoChamados
      .alterarTecnico(inf.nome, routeProtocolo, routeId)
      .then(alert('tecnico incluído com sucesso'))
  }

  async function excluirTec() {
    const inf = await daoUser.obterUserPeloUid(routeId)
    daoChamados
      .alterarTecnico(null, routeProtocolo, null)
      .then(alert('tecnico removido com sucesso'))
  }

  function ItemComponent({ items }) {
    return (
      <View style={styles.viewAux}>
        {items.map((item, index) => (
          <View key={index}>
            <Text>{item.nome} </Text>
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
          <TextInput
            style={styles.input}
            placeholder="Status"
            value={status}
            onChangeText={setStatus}
          />
        </View>
        <View style={styles.viewOpcs}>
          {idTec == routeId ? (
            <></>
          ) : (
            <>
              {tecnico != null ? (
                <TouchableOpacity
                  onPress={() => {
                    daoChamados
                      .incluirAuxiliar(
                        routeProtocolo,
                        usuario.split(' ')[0],
                        routeId,
                      )
                      .then((e) => {
                        if (e) {
                          alert('auxiliar incluido')
                        }
                      })
                  }}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Auxiliar chamado</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    incluirTec()
                  }}
                >
                  <Text style={styles.buttonText}>Receber Chamado</Text>
                </TouchableOpacity>
              )}
            </>
          )}

          <TouchableOpacity style={styles.button}>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() =>{idTec == routeId ? excluirTec(): excluirAux(routeId)}}
          >
            <Text style={styles.buttonText}>Desistir do Chamado</Text>
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
