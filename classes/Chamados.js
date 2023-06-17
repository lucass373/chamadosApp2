import ModelError from "../classes/ModelError";

export default class Chamado{
    
  //-----------------------------------------------------------------------------------------//

  constructor(protocolo, problema, sala, status) {
    this.setProtocolo(protocolo);
    this.setProblema(problema);
    this.setSala(sala);
    this.setStatus(status);
  }
  
  
  
  //-----------------------------------------------------------------------------------------//
  getProtocolo() {
    return this.protocolo;
  }
  
  setProtocolo(protocolo) {
    if(!Chamado.validarProtocolo(protocolo))
      throw new ModelError("Protocolo invalido: " +protocolo);
      this.protocolo = protocolo;
  }
  
  //-----------------------------------------------------------------------------------------//

  getProblema() {
    return this.problema;
  }
  
  //-----------------------------------------------------------------------------------------//

  setProblema(problema) {
    if(!Chamado.validarProblema(problema))
      throw new ModelError("Problema invalido: " + problema);
    this.problema = problema;
  }
  
  //-----------------------------------------------------------------------------------------//


  getSala() {
    return this.sala;
  }
  
  //-----------------------------------------------------------------------------------------//

  setSala(sala) {
    if(!Chamado.validarSala(sala))
      throw new ModelError("sala Inválido: " + sala);
    this.sala = sala;
  }
  //-----------------------------------------------------------------------------------------//
  
  getStatus() {
    return this.status;
  }
  
  //-----------------------------------------------------------------------------------------//
  setStatus(status) {
    if(!Chamado.validarStatus(status))
      throw new ModelError("Status Inválido: " +status);
    this.status = status;
  }
  


  
  
  
  //-----------------------------------------------------------------------------------------//
  
  static validarProtocolo(prtcl) {
    if(prtcl == null || prtcl == "" || prtcl == undefined)
      return false;
    const padraoPrtcl = /[0-9]/;
    if (!padraoPrtcl.test(prtcl))
      return false;
    return true;
  }
  //-----------------------------------------------------------------------------------------//

  static validarProblema(prblm) {
    if(prblm == null || prblm == "" || prblm == undefined)
      return false;
    
    return true;
  }

  //-----------------------------------------------------------------------------------------//
  static validarSala(sala) {
    if(sala == null || sala == "" || sala == undefined)
      return false;
    
    return true;
  }
  //-----------------------------------------------------------------------------------------//

    static validarStatus(status) {
    if(status == "")
      return false;
    
    return true;
  }
}