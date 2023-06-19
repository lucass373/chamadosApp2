import ModelError from "../classes/ModelError";
import {
  getDatabase,
  orderByValue,
  ref,
  set,
  limitToLast,
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
import Chamados from "../classes/Chamados";

const db = getDatabase(init);

export default class DaoChamados {
  static promessaConexao = null;

  constructor() {
    this.obterConexao();
  }

  async obterConexao() {
    if (DaoChamados.promessaConexao == null) {
      DaoChamados.promessaConexao = new Promise(function (resolve, reject) {
        const db = getDatabase(init);
        if (db) resolve(db);
        else
          reject(
            new ModelError("Não foi possível estabelecer conexão com o BD")
          );
      });
    }
    return DaoChamados.promessaConexao;
  }

  async incluir(nome, email, chamado, data) {
    let connection = await this.obterConexao();
    const protocolo = chamado.getProtocolo().toString();
    const problema = chamado.getProblema();
    const sala = chamado.getSala().toString();
    const status = chamado.getStatus();

    //--------- PROMISE --------------//
    let resultado = new Promise((resolve, reject) => {
      let refChamado = ref(connection, "chamados");
      runTransaction(refChamado, (chamado) => {

        let refNewChamado = child(refChamado, protocolo);
        let setPromise = set(refNewChamado, {
          protocolo: protocolo,
          email: email,
          nome: nome,
          problema: problema,
          sala: sala,
          data: data,
          status: status,
        
        });
        setPromise.then(
          (value) => {
            resolve(true);
          },
          (erro) => {
            reject(erro);
          }
        );
      });
    });
    return resultado;
  }

  async obterProt() {
    let connection = await this.obterConexao();
    const chamadosRef = ref(connection, "chamados");

    const queryRef = query(
      chamadosRef,
      orderByChild("protocolo"),
      limitToLast(1)
    );

    return new Promise((resolve, reject) => {
      get(queryRef)
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            resolve(childData.protocolo);
          });
          // Se nenhum registro for encontrado, a função resolve com `null`
          resolve(0);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

 async obterChamadosFiltrado(email) {
  let connection = await this.obterConexao();
  const chamadosRef = ref(connection, "chamados");
  const snapshot = await get(chamadosRef);
  const filt = [];
  return new Promise((resolve, reject) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      if (childData.email === email) {
        filt.push(childData);
      }
    });
    if (filt.length > 0) {
      resolve(filt);
    } else {
      reject(`Não há dados com o email ${email}`);
    }
  });
}
async obterChamadosFiltradoTec() {
  let connection = await this.obterConexao();
  const chamadosRef = ref(connection, "chamados");
  const snapshot = await get(chamadosRef);
  const filt = [];
  return new Promise((resolve, reject) => {
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      
        filt.push(childData);
      
    });
    if (filt.length > 0) {
      resolve(filt);
    } else {
      reject(`Não há dados com o email: ${email}`);
    }
  });
}
  
  async alterarStatus(protocolo,status){
     let connection = await this.obterConexao();
     const chamadoRef = ref(connection, "chamados/"+protocolo);
     const updates = {}
     updates["status"] = status
     update(chamadoRef, updates)
  }
  
  
  async excluirChamado(protocolo){
    
    let connection = await this.obterConexao();
    let refChamado = ref(connection, "chamados/" + protocolo)
    
   return new Promise(async (resolve, reject) => {
      const existe = await this.verificarExiste(protocolo)
     if(existe){
     remove(refChamado).then(
       resolve("Chamado removido com sucesso")
     ).catch(reject("Chamado não encontrado"))
     }else{
       resolve("Chamado não encontrado")
     }
  });
  }
  
  
  async verificarExiste(protocolo) {
    let connection = await this.obterConexao();
    //--------- PROMISE --------------//
    return new Promise((resolve, reject) => {
      let refChamado = ref(connection, "chamados/"+ protocolo);
      get(refChamado)
        .then((snapshot) => {
          // verifica se o valor existe no nó
          if (snapshot.val() !== null) {
            console.log("existo");
            resolve(true);
          } else {
            console.log("nao existo");
            resolve(false);
          }
        })
        .catch((error) => {
          reject(error);
          console.error(error);
        });
    });
  }
  
  async alterarChamado(protocolo, problema, sala, status) {
    let connection = await this.obterConexao();
    
    
    return new Promise((resolve,reject)=>{
      let refChamado = ref(connection, "chamados/"+ protocolo);
      const updates = {
        "problema": problema,
        "sala": sala,
        "status": status,
      }
      update(refChamado, updates).then(()=>{
        resolve(true)
        alert("Chamado Alterado com sucesso!")
      }
      ).catch(
      reject(false))
    })
  }
    

  async obterAuxiliaresFiltrado(protocolo) {
    let connection = await this.obterConexao();
    const chamadosRef = ref(connection, "chamados/"+protocolo+"/auxiliares");
    const snapshot = await get(chamadosRef);
    const filt = [];
    return new Promise((resolve, reject) => {
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        filt.push(childData.nome);
      });
      if (filt.length > 0) {
        resolve(filt);
      } else {
        reject(`Não há dados com o protocolo ${protocolo}`);
      }
    });
  }
  async alterarTecnico(tecnico,protocolo,id) {
    let connection = await this.obterConexao();
    
    
    return new Promise((resolve,reject)=>{
      let refChamado = ref(connection, "chamados/"+ protocolo);
      const updates = {
        "tecnico": tecnico,
        "idTecnico": id,
      }
      update(refChamado, updates).then(
      resolve(true)
      ).catch(
      reject(false))
    })
  }

  async incluirAuxiliar(protocolo,nome, uid) {
    let connection = await this.obterConexao();
    var numAux = await this.obterNumAux(protocolo)
    numAux= Number(numAux) + 1
    const existe = await this.verificarExisteAux(uid,protocolo)
    //--------- PROMISE --------------//
    return new Promise((resolve, reject) => {
      let refAuxiliar = ref(connection, "chamados/"+protocolo+"/auxiliares");
      runTransaction(refAuxiliar, (auxiliar) => {

        let refNewAuxiliar = child(refAuxiliar, numAux.toString());
        if (existe === false){
        let setPromise = set(refNewAuxiliar, {
          "num": numAux,
          "nome": nome,
          "uid" : uid,        });
       
        setPromise.then(
          (value) => {
            resolve(true);
          },
          (erro) => {
            reject(erro);
          }
        );
        }else{
          alert("você já está auxiliando o chamado")
        }
      });
    });
  }

  async obterNumAux(protocolo) {
    let connection = await this.obterConexao();
    const chamadosRef = ref(connection, "chamados/"+protocolo+"/auxiliares");

    const queryRef = query(
      chamadosRef,
      orderByChild("num"),
      limitToLast(1)
    );

    return new Promise((resolve, reject) => {
      get(queryRef)
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            resolve(childData.num);
          });
          // Se nenhum registro for encontrado, a função resolve com `null`
          resolve(0);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  async verificarExisteAux(uid,protocolo) {
    let connection = await this.obterConexao();
    let refUser = ref(connection, "chamados/"+protocolo+"/auxiliares");
    let query1 = query(refUser, orderByChild("uid"), equalTo(uid));
    //--------- PROMISE --------------//
    return new Promise(function (resolve, reject) {
 
      onValue(query1, function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const uid = childSnapshot.val();
          if(uid != null){
            resolve(true)
          }
        });
        // Se nenhum usuário foi encontrado, resolve com null
         resolve(false);
      });
  });
}


async obterAuxPeloUid(uid,protocolo) {
  let connection = await this.obterConexao();
  let refUser = ref(connection, "chamados/"+protocolo+"/auxiliares");
  let query1 = query(refUser, orderByChild("uid"), equalTo(uid));
  return new Promise(function (resolve, reject) {
      onValue(query1, function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const aux = childSnapshot.val();
          resolve(aux);
        });
      });
  });
}

async excluirAux(protocolo,uid){
    
  let connection = await this.obterConexao();
  let refChamado = ref(connection, "chamados/" + protocolo+"/auxiliares")
  
 return new Promise(async (resolve, reject) => {
    const existe = await this.verificarExiste(protocolo)
   if(existe){
   remove(refChamado).then(
    resolve(true)
   )
   }else{
     alert("Auxiliar não encontrado")
   }
});
}

/*r
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
      reject(null);
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
  
  
  
  }*/
}
