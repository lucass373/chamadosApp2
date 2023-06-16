import {ModelError} from "./ModelError";

export default class User {
    
  //-----------------------------------------------------------------------------------------//

  constructor(uid, email, nome, perfil, ativo, matricula) {
    this.setUid(uid);
    this.setEmail(email);
    this.setNome(nome);
    this.setPerfil(perfil);
    this.setAtivo(ativo);
    this.setMatricula(matricula);
  }
  
  
  
  //-----------------------------------------------------------------------------------------//
  getMatricula() {
    return this.matricula;
  }
  
  setMatricula(matricula) {
    if(!User.validarMatricula(matricula))
      throw new ModelError("Matricula invalido: " + matricula);
    this.matricula = matricula;
  }
  
  //-----------------------------------------------------------------------------------------//

  getEmail() {
    return this.email;
  }
  
  //-----------------------------------------------------------------------------------------//

  setEmail(email) {
    if(!User.validarEmail(email))
      throw new ModelError("Email invalido: " + email);
    this.email = email;
  }
  
  //-----------------------------------------------------------------------------------------//

  getUid() {
    return this.uid;
  }
  
  //-----------------------------------------------------------------------------------------//

  setUid(uid) {
    if(!User.validarUid(uid))
      throw new ModelError("uid Inválido: " + uid);
    this.uid = uid;
  }
  
  //-----------------------------------------------------------------------------------------//

  getNome() {
    return this.nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  setNome(nome) {
    if(!User.validarNome(nome))
      throw new ModelError("Nome Inválido: " + nome);
    this.nome = nome;
  }
  
  //-----------------------------------------------------------------------------------------//

  //-----------------------------------------------------------------------------------------//

  getPerfil() {
    return this.perfil;
  }
  
  //-----------------------------------------------------------------------------------------//

  setPerfil(perfil) {
    if(!User.validarPerfil(perfil))
      throw new ModelError("perfil inválido: " + perfil);
    this.perfil = perfil;
  }
  
  //-----------------------------------------------------------------------------------------//
  getAtivo() {
    return this.ativo;
  }
  
  //-----------------------------------------------------------------------------------------//

  setAtivo(ativo) {
    if(!User.validarAtivo(ativo))
      throw new ModelError("ativo inválido: " + ativo);
    this.ativo = ativo;
  }
  
  
  //-----------------------------------------------------------------------------------------//
  
  static validarMatricula(matr) {
    if(matr == null || matr == "" || matr == undefined)
      return false;
    const padraoMatricula = /[0-9]/;
    if (!padraoMatricula.test(matr))
      return false;
    return true;
  }
  //-----------------------------------------------------------------------------------------//

  static validarUid(uid) {
    if(uid == null || uid == "" || uid == undefined)
      return false;
    
    return true;
  }

  //-----------------------------------------------------------------------------------------//
  static validarEmail(email) {
    if(email == null || email == "" || email == undefined)
      return false;
    
    return true;
  }
  //-----------------------------------------------------------------------------------------//

    static validarNome(nome) {
    if(nome == null || nome == "" || nome == undefined)
      return false;
    
    return true;
  }

  //-----------------------------------------------------------------------------------------//
  static validarPerfil(perfil) {
    if(perfil == null || perfil == "" || perfil == undefined)
      return false;
    
    return true;
  }
  //-----------------------------------------------------------------------------------------//

    static validarAtivo(ativo) {
    if(typeof ativo !== "boolean")
      return false;
    
    return true;
  }

  //-----------------------------------------------------------------------------------------//
   
}