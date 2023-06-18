import { useEffect, useState, Alert } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import User from "../classes/User"
import DaoUser from "../DAO/DaoUser";


WebBrowser.maybeCompleteAuthSession();



export default function LoginScreen({navigation}) {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(0);
  const [userMatr, setUserMatr] = useState(0);
  

  const dao = new DaoUser()
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "575102804747-rijtrl26534m16e066jk96lbju3rrkdf.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);

      let existeUid = await dao.verificarExiste(user.id)

      if(existeUid){
        console.log(existeUid)
        navigation.navigate("TecScreen",{id: user.id})
      }
    } catch (error) {
      console.log(error)
    }
  };

  async function incluirUsr(mtrl){
    let existeMat = await dao.verificarExisteMat(mtrl);
    if(existeMat){
     
  }
  else{
    console.log(existeMat)
    if(existeMat == true){
      alert("Matricula Existe")
    }else{
    let nUser = new User(userInfo.id,userInfo.email,userInfo.name,"Tec",false, mtrl)
    dao.incluir(nUser)
    navigation.navigate("TecScreen",{id: userInfo.id})
    }
  }
  }


  return (
    <View style={styles.container}>
      {userInfo == 0 ? (
        <Button
          title="Sign in with Google"
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (<View>
        <Text style={styles.text}>Digite Sua matrícula</Text>
        <TextInput placeholder="Digite sua Matrícula" onChangeText={setUserMatr} value={userMatr} />
        <Button title="Incluir" onPress={()=>incluirUsr(userMatr)} />
        </View>
      )}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
