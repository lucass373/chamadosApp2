import ModelError from "../classes/ModelError";
import {
  getDatabase,
  ref,
  set,
  push,
  update,
  remove,
  orderByChild,
  equalTo,
  query,
  child,
  onValue,
  runTransaction,
  get,
} from "firebase/database";
import { init } from "./firebase.js";
import User from "../classes/User.js";

const db = getDatabase(init);

export default class DaoUser {
  static promessaConexao = null;

  constructor() {
    this.obterConexao();
  }

  async obterConexao() {
    if (DaoUser.promessaConexao == null) {
      DaoUser.promessaConexao = new Promise(function (resolve, reject) {
        const db = getDatabase(init);
        if (db) resolve(db);
        else
          reject(
            new ModelError("Não foi possível estabelecer conexão com o BD")
          );
      });
    }
    return DaoUser.promessaConexao;
  }

  async incluir(user) {
    console.log("Oi1");
    let connection = await this.obterConexao();
     let refUser = ref(connection, "user");
    //--------- PROMISE --------------//
   return new Promise((resolve, reject) => {
  
      runTransaction(refUser, (users) => {
        let refNewUser = child(refUser, user.getUid());
        let setPromise = set(refNewUser, user);
        setPromise.then(
            resolve(true) 
        ).catch((erro) => {
            reject(erro);
          });
      });
     
      
    });
  }
  
  async verificarExisteMat(mtrcl) {
    let connection = await this.obterConexao();
    let refUser = ref(connection, "user");
    let query1 = query(refUser, orderByChild("matricula"), equalTo(mtrcl));
    //--------- PROMISE --------------//
    return new Promise(function (resolve, reject) {
 
      onValue(query1, function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const user = childSnapshot.val();
          if(user != null){
            resolve(true)
          }
        });
        // Se nenhum usuário foi encontrado, resolve com null
         resolve(false);
      });
  });
}
  

  async verificarExiste(uid) {
    let connection = await this.obterConexao();
    let refUser = ref(connection, "user/"+uid);
    //--------- PROMISE --------------//
    return new Promise((resolve, reject) => {
      get(refUser)
        .then((snapshot) => {
          // verifica se o valor existe no nó
          if (snapshot.val() !== null) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
          console.error(error);
        });
    });
  }

   async obterUserPeloUid(uid) {
    let connection = await this.obterConexao();
    let refUser = ref(connection, "user/");
    let query1 = query(refUser, orderByChild("uid"), equalTo(uid));
    let promessa = new Promise(function (resolve, reject) {
      try {
        onValue(query1, function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            const user = childSnapshot.val();
            resolve(
              new User(
                user.uid,
                user.email,
                user.nome,
                user.perfil,
                user.ativo,
                user.matricula
              )
            );
          });
        });
      } catch (e) {
        reject(new ModelError("Erro: " + e));
      }
    });
    return promessa;
  }


  async obterUserPelaMatricula(matricula) {
  let connection = await this.obterConexao();
  let refUser = ref(connection, "user/");
  let query1 = query(refUser, orderByChild("matricula"), equalTo(matricula));
  
  return new Promise(function (resolve, reject) {
    try {
      onValue(query1, function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const user = childSnapshot.val();
          resolve(
            new User(
              user.uid,
              user.email,
              user.nome,
              user.perfil,
              user.ativo,
              user.matricula
            )
          );
        });
        // Se nenhum usuário foi encontrado, resolve com null
        resolve(null);
      });
    } catch (e) {
      reject(e);
    }
  });
}



  async alterarAtivo(uid) {
    let connection = await this.obterConexao();
    let refUser = ref(connection, "user/"+ uid);
    const updates = {};
    updates["ativo"] = true;
    return update(refUser, updates);
}
  
  
  async alterarInativo(uid) {
    let connection = await this.obterConexao();
    let refUser = ref(connection, "user/"+ uid);
    const updates = {};
    updates["ativo"] = false;
    return update(refUser, updates);
}
  
  async alterarUser(matricula, nome, email, perfil,uid) {
    let connection = await this.obterConexao();
    let refUser = ref(connection, "user/"+ uid);
    const updates = {
      "email": email,
      "matricula": matricula,
      "nome": nome,
      "perfil": perfil,
    }
    return update(refUser, updates);
}
  
  async excluirUser(uid){
    let connection = await this.obterConexao();
    let refUser = ref(connection, "user/"+uid)
    remove(refUser)
    .then(
      console.log("Usuario removido com sucesso"))
    .catch("Falha ao remover o usuário")
  }
  
}