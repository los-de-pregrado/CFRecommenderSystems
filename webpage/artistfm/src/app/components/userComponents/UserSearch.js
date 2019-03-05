import React, {Component} from 'react';
import copy from 'copy-to-clipboard';

class UserSearch extends Component{

  constructor(props){
    super(props);    
    this.state={
        idLogged : this.props.idLogged,
        user:{},
        toptengen: [],
        toptenmine: []
    }
    
    this.actualizar = this.actualizar.bind(this);

    this.actualizar();
  }

  actualizar(){
    fetch('/api/user/'+this.state.idLogged).then(res => res.json()).then(data => {       
            this.setState({
                user:data
            });         
      });
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
                  <AddContest post = {this.postContest} put = {this.putContest} idLogged = {this.state.user.id} concurso = {this.state.cambiando}/> 
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

export default UserSearch;