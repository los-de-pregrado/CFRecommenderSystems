import React, {Component} from 'react';
import copy from 'copy-to-clipboard';

import AddContest from './AddContest'
import ContestProfile from '../contestComponents/ContestProfile'

class AdminContests extends Component{

  constructor(props){
    super(props);    
    this.state={
        idLogged : this.props.idLogged,
        admin:{},
        concursos: [],
        agregando: false,
        cambiando : null,
        borrando: null,        
        contestActivo : null
    }
    
    this.actualizar = this.actualizar.bind(this);
    this.postContest = this.postContest.bind(this);
    this.putContest = this.putContest.bind(this);
    this.deleteContest = this.deleteContest.bind(this);
    this.toAdd = this.toAdd.bind(this)
    this.toEdit = this.toEdit.bind(this);
    this.toDelete = this.toDelete.bind(this);
    this.toContestList = this.toContestList.bind(this);
    this.toContestProfile = this.toContestProfile.bind(this);
    this.compartirURL = this.compartirURL.bind(this);

    this.actualizar();
  }

  actualizar(){
    fetch('/api/admin/'+this.state.idLogged).then(res => res.json()).then(data => {        
        if(data.Contests == null){
            this.setState({
                admin:data
            });
        }
        else{
            this.setState({
                admin:data,
                concursos: data.Contests
            });
        }       
      });
  }

  toAdd(){
    this.setState({
      agregando: true,
      cambiando : null
    })
  }

  toEdit(concurso){
    this.setState({
      agregando: true,
      cambiando : concurso
    })
  }

  toDelete(concurso){
    this.setState({
      borrando: concurso          
    });
  }

  postContest(){
    this.setState({
      cambiando: null,
      agregando: false
    });
    this.actualizar();
  }

  putContest(){
    this.setState({
      cambiando: null,
      agregando: false,
    });
    this.actualizar();
  }

  deleteContest(id){
    fetch('/api/concurso/'+id).then(res => res.json()).then(data => {    
      
      fetch('/api/admin/'+this.state.admin.id+"/concursos/"+id,{method: 'DELETE'}).then(res => {
          if(res.ok)
          {
              M.toast({html: 'Concurso eliminado', classes:'rounded'});
              this.actualizar();
          }
          else
          {
              throw new Error("El concurso no ha podido eliminarse");
          }
      }).catch(error =>  M.toast({html:error.message, classes:'rounded'}));
          
    });   
    
    this.setState({
      borrando: null          
    });
  }

  compartirURL(url){
    copy("http://172.24.42.48:8082/"+url);
    M.toast({html: 'URL del concurso copiada en el portapapeles', displayLength: 10000,classes:'rounded'});    
  }

  toContestProfile(contest){
    fetch('/api/concurso/'+contest.id).then(res => res.json()).then(data => {        
      this.setState({
        cambiando: null,
        agregando: false,
        contestActivo : data
      });      
    });    
  }

  toContestList(){
    this.setState({
      cambiando: null,
      agregando: false,
      contestActivo : null
    })
  }
  
  componentDidMount(){
    document.dispatchEvent(new Event('component'));      
  }

  render(){

    const concursos = this.state.concursos.map((concurso,i)=>{
        return(
            <div className = "col s4" key = {concurso.id}>
                <div className="card medium sticky-action">
                    <div className="card-image waves-effect waves-block waves-light">
                        <img className="activator" src={"./imagesbanner/"+concurso.contest_banner}/>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{concurso.contest_name}<i className="material-icons right">more_vert</i></span>
                        <p><i>/{concurso.contest_url}</i></p>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{concurso.contest_name}<i className="material-icons right">close</i></span>
                        <p><b>Guión: </b>"{concurso.contest_script}"</p>
                        <p><b>Descripción y recomendaciones:</b> {concurso.contest_guidelines}</p>
                    </div>
                    <div className="card-action">
                        <a href="#" onClick = {() => this.toContestProfile(concurso)} className="black-text"><b>Abrir</b></a>
                        <a href="#" onClick = {() => this.compartirURL(concurso.contest_url)} className="black-text"><b>Compartir</b></a>
                        <a href="#confirmDeleteModal" onClick = {() => this.toDelete(concurso.id)} className="modal-trigger black-text"><i className="material-icons right">delete</i></a>
                        <a href="#" onClick = {() => this.toEdit(concurso)} className="black-text"><i className="material-icons right">edit</i></a>
                    </div>
                </div>
                
                
            </div>
          )
    })

    return(
        
      <div>
        {
          this.state.contestActivo==null?
          <div className = "container">
            <center><h5>Mis concursos {!this.state.agregando?<a onClick = {this.toAdd} className="btn-floating btn-large waves-effect waves-light red darken-3"><i className="material-icons">add</i></a>:null}</h5></center>
            <br></br>
            
            {
              this.state.agregando?
              <div className = "row">
                <div className = "container">
                  <AddContest post = {this.postContest} put = {this.putContest} idLogged = {this.state.admin.id} concurso = {this.state.cambiando}/> 
                </div>
                <br></br>
              </div>              
              :null 
            }      
            
            <div className = "row">
                {concursos}
            </div>
          </div>
          :
          <ContestProfile contest = {this.state.contestActivo} salir = {this.toContestList} externo = {false}/>
        }   

        <div id="confirmDeleteModal" className="modal s6">
          <div className="modal-content">
            <h4>Eliminar el concurso</h4>
            <p>Si el concurso tiene voces de participantes, éstas serán eliminadas también. ¿Estás seguro que deseas eliminar este concurso?</p>
          </div>
          <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-green btn-flat">No</a>
            <a onClick = {() => this.deleteContest(this.state.borrando)} className="modal-close waves-effect waves-green btn-flat">Sí, estoy seguro</a>
          </div>
        </div>
        
      </div>
        
    )
  }
}

export default AdminContests;