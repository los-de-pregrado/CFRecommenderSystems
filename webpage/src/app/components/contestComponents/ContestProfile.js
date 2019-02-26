import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import dateFormat from 'dateformat';

class ContestProfile extends Component{

  constructor(props){
    super(props);   
    {
      this.state={        
        contest : this.props.contest,
        participaciones: this.props.contest.Participations,
        participacionesActivas : this.props.contest.Participations.slice(0,50),
        newVoice : null,
        externo : this.props.externo,
        participation_comments: '',
        participation_email: '',
        participation_names: '',
        participation_lastnames: '',
        enviando: false
      }
    }
    this.uploadVoice = this.uploadVoice.bind(this); 
    this.handleInput = this.handleInput.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  uploadVoice(){
    const voice = this.uploadInput.files[0];

    if(voice == null || this.state.participation_names == '' || this.state.participation_lastnames == '' || this.state.participation_comments == '' || this.state.participation_email == ''){
      M.toast({html:'Ingresa valores válidos y un archivo de voz (audio) para su participación', classes: 'rounded'}); 
    }
    else{
      const data = new FormData();
      data.append('file', voice);
      data.append('filename', voice.name);
      
      this.setState({
        newVoice: voice.name,
        enviando: true
      },()=>{

        fetch('/upload', {
          method: 'POST',
          body: data
          }).then((res)=> {
            const nuevaParticipacion = {participation_names:this.state.participation_names, participation_lastnames:this.state.participation_lastnames, participation_email:this.state.participation_email, participation_comments: this.state.participation_comments, participation_date: new Date(), participation_originalroute: voice.name, participation_route:'', participation_status:"En proceso"};
            fetch('/api/concurso/'+ this.state.contest.id+ '/participaciones',{
              method: 'POST',
              body: JSON.stringify(nuevaParticipacion),
              headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              }}).then(res => {              
                  if(res.ok){
                      return res.json();                   
                  }
                  else{
                      throw new Error("Ya existe una participación de este correo electrónico o ese mismo archivo ya fue enviado");
              }}).then(data => {
                this.setState({
                  enviando: false
                },()=> M.toast({html:'Tu archivo de participación ha sido enviado. Se te enviará un correo avisándote que tu audio fue procesado y publicado en la página.', displayLength: 100000, classes: 'rounded'})
                  );                                 
              }).catch(error => {
                M.toast({html:error.message, classes: 'rounded'})
                this.setState({ enviando: false });
              });                            
          }).catch(error => {
            M.toast({html: error.message, classes: 'rounded'});
            this.setState({ enviando: false });;
          });
      });

                   
    }   
  }

  handleInput(e){
    const {value, id} = e.target;
    this.setState({
      [id]: value
    });
  }

  handlePageClick(data){
    let numPag = data.selected;
    if(this.state.externo){
      this.setState({
        participacionesActivas: this.state.participaciones.slice((numPag)*20,(numPag+1)*20)
      });
    }
    else{
      this.setState({
        participacionesActivas: this.state.participaciones.slice((numPag)*50,(numPag+1)*50)
      });
    }
    
  }

  componentDidMount(){
    document.dispatchEvent(new Event('component')); 
  }

  render(){
    
    var participaciones = {};
    var participacionesActivas ={};


    if(this.state.externo)
    {
      participaciones = this.state.participaciones.map((participation,i)=>{
        if(participation.participation_status == "Convertida"){      
          return(            
                <li key={participation.id}>
                    <div className="collapsible-header"><i className="material-icons">person</i>{participation.participation_names} {participation.participation_lastnames}</div>
                    <div className="collapsible-body">
                      <p><b>Comentarios: </b>{participation.participation_comments}</p>
                      <p><b>E-mail: </b>{participation.participation_email}</p>
                      <p><b>Fecha de envío: </b>{dateFormat(participation.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
                      <p><b>Voz de {participation.participation_names}:</b></p>
                      <div className = "row">                      
                        <div className = "col s6">
                          <audio controls>
                            <source src={"./ffmpeg/voices/"+participation.participation_route} type="audio/mp3"/>
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                        <div className = "col s6">
                          <p>Puedes descargar el <a href={"./ffmpeg/voices/"+ participation.participation_originalroute} download>archivo original</a>.</p>
                        </div>
                      </div>
                    </div>
                </li>            
            )
          }
          else{      
            return(<div key={participation.id}></div>)
          }        
        });

      participacionesActivas = this.state.participacionesActivas.map((participation,i)=>{
        if(participation.participation_status == "Convertida"){      
          return(            
                <li key={participation.id}>
                    <div className="collapsible-header"><i className="material-icons">person</i>{participation.participation_names} {participation.participation_lastnames}</div>
                    <div className="collapsible-body">
                      <p><b>Comentarios: </b>{participation.participation_comments}</p>
                      <p><b>E-mail: </b>{participation.participation_email}</p>
                      <p><b>Voz de {participation.participation_names}:</b></p>
                      <p><b>Fecha de envío: </b>{dateFormat(participation.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
                      <div className = "row">                      
                        <div className = "col s6">
                          <audio controls>
                            <source src={"./ffmpeg/finalVoices/"+participation.participation_route} type="audio/mp3"/>
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                        <div className = "col s6">
                          <p>Puedes descargar el <a href={"./ffmpeg/voices/"+ participation.participation_originalroute} download>archivo original</a>.</p>
                        </div>
                      </div>
                    </div>
                </li>            
            )
          }
          else{      
            return(<div key={participation.id}></div>)
          }        
        });
    }
    else{
      participaciones = this.state.participaciones.map((participation,i)=>{
             
          return(            
                <li key={participation.id}>
                    <div className="collapsible-header"><i className="material-icons">person</i>{participation.participation_names} {participation.participation_lastnames}</div>
                    <div className="collapsible-body">
                      <p><b>Comentarios: </b>{participation.participation_comments}</p>
                      <p><b>E-mail: </b>{participation.participation_email}</p>
                      <p><b>Estado: </b>{participation.participation_status}</p>
                      <p><b>Fecha de envío: </b>{dateFormat(participation.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>                      
                      <p><b>Voz de {participation.participation_names}:</b></p>
                      <div className = "row">                      
                        <div className = "col s6">
                        {
                          participation.participation_status=="Convertida"?
                          <audio controls>
                            <source src={"./ffmpeg/voices/"+participation.participation_route} type="audio/mp3"/>
                            Your browser does not support the audio element.
                          </audio>
                          :<p>Podrás escuchar el audio convertido cuando se haya procesado.</p>
                        }
                          
                        </div>
                        <div className = "col s6">
                          <p>Puedes descargar el <a href={"./ffmpeg/voices/"+ participation.participation_originalroute} download>archivo original</a>.</p>
                        </div>
                      </div>
                    </div>
                </li>            
            )                 
        });

      participacionesActivas = this.state.participacionesActivas.map((participation,i)=>{
              
          return(            
                <li key={participation.id}>
                    <div className="collapsible-header"><i className="material-icons">person</i>{participation.participation_names} {participation.participation_lastnames}</div>
                    <div className="collapsible-body">
                      <p><b>Comentarios: </b>{participation.participation_comments}</p>
                      <p><b>E-mail: </b>{participation.participation_email}</p>
                      <p><b>Estado: </b>{participation.participation_status}</p>
                      <p><b>Voz de {participation.participation_names}:</b></p>
                      <p><b>Fecha de envío: </b>{dateFormat(participation.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
                      <div className = "row">                      
                        <div className = "col s6">
                        {
                          participation.participation_status=="Convertida"?
                          <audio controls>
                            <source src={"./ffmpeg/voices/"+participation.participation_route} type="audio/mp3"/>
                            Your browser does not support the audio element.
                          </audio>
                          :<p>Podrás escuchar el audio convertido cuando se haya procesado.</p>
                        }
                        </div>
                        <div className = "col s6">
                          <p>Puedes descargar el <a href={"./ffmpeg/voices/"+ participation.participation_originalroute} download>archivo original</a>.</p>
                        </div>
                      </div>
                    </div>
                </li>            
            )          
                  
        });
    }      

    return(
                
        <div className = "container">  
            <center>
              {
                !this.state.externo?
                <div>
                <a onClick ={this.props.salir} className="waves-effect waves-light btn red darken-3">Volver</a>
                <br></br>
                <br></br>
                </div>
                :null
              }   
                     
              <div className ="carousel carousel-slider">
                  <a className ="carousel-item" href="#one!"><img className = "responsive-img" src={"./imagesbanner/"+this.state.contest.contest_banner}/></a>
              </div>
              <br></br>
              <h5><b>{this.state.contest.contest_name}</b></h5>  
              <br></br>
              <table>
                <tbody>
                  <tr>
                    <td><b>Fecha de inicio</b></td>
                    <td>{dateFormat(this.state.contest.contest_begindate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>                
                  </tr>
                  <tr>
                    <td><b>Fecha final</b></td>
                    <td>{dateFormat(this.state.contest.contest_enddate, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>                
                  </tr>
                  <tr>
                    <td><b>Guión</b></td>
                    <td>"{this.state.contest.contest_script}"</td>                
                  </tr>
                  <tr>
                    <td><b>Premio</b></td>
                    <td>${this.state.contest.contest_prize}</td>               
                  </tr>
                  <tr>
                    <td><b>Instrucciones y recomendaciones:</b></td>
                    <td>{this.state.contest.contest_guidelines}</td>               
                  </tr>
                </tbody>
              </table>
            </center> 
            <br></br>
            <div className = "container">              
              {
                this.state.externo&&(new Date(this.state.contest.contest_enddate) >= new Date())&&(new Date(this.state.contest.contest_begindate) <= new Date())?
                <div>
                  <center><h5>Envíanos tu voz y participa en este concurso</h5></center>
                  <br></br>
                  <form>
                    <div className="row">
                        <div className="input-field col s6">
                        <input  id="participation_names" type="text" className="validate" onChange = {this.handleInput} />
                        <label htmlFor="participation_names">Nombres</label>
                        </div>  
                        <div className="input-field col s6">
                        <input id="participation_lastnames" type="text" className="validate" onChange = {this.handleInput}/>
                        <label htmlFor="participation_lastnames">Apellidos</label>
                        </div>                      
                    </div>               
                    <div className="row">
                        <div className="input-field col s12">
                          <input id="participation_email" type="email" className="validate" onChange = {this.handleInput}/>
                          <label htmlFor="participation_email">Correo electrónico</label>
                          <span className="helper-text" data-error="No es válido" data-success="Es válido">Escribe tu correo...</span>
                        </div> 
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="participation_comments" type="text" className="validate" onChange = {this.handleInput}/>
                        <label htmlFor="participation_comments">Comentarios</label>
                        </div>
                    </div>                 
                    <div className="file-field input-field">                    
                      <div className = "row">
                        <div className = "col s10">
                          <div className="btn red darken-1">
                            <span><i className="material-icons">file_upload</i></span>
                            <input type="file"  ref={(ref) => { this.uploadInput = ref; }}/>
                          </div>
                          <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="¡Envía tu voz ahora mismo y participa!"/>
                          </div>
                        </div>
                        <div className = "col s2">
                          <a onClick ={this.uploadVoice} className="waves-effect waves-light btn red darken-2">Enviar voz</a>
                        </div>                      
                      </div>                  
                    </div>
                  </form>
                </div>
                :null
              }
              
              {
                this.state.enviando?
                <div>
                  <br></br>
                  <div className="progress red lighten-5">
                      <div className="indeterminate red darken-3"></div>
                  </div>
                  <br></br>
                </div>
                :null
              }

              {
                new Date(this.state.contest.contest_enddate) < new Date()?
                <div>
                  <br></br>
                  <center><h6>El concurso ya terminó. No se reciben más participaciones.</h6></center>
                  <br></br>
                </div>
                :new Date(this.state.contest.contest_begindate) > new Date()?
                <div>
                  <br></br>
                  <center><h6>El concurso no ha comenzado. Se recibirán participaciones a partir de la fecha de inicio.</h6></center>
                  <br></br>
                </div>
                :null
              }

              {
                this.state.contest.Participations.length!=0?       
                <div>
                  <br></br>              
                  <center><h5>Participaciones del concurso</h5></center>
                  <br></br>                            

                  {
                    this.state.externo?
                      this.state.participaciones.length>20?
                      <div>
                        <center>
                          <ReactPaginate
                            previousLabel={'Anterior'}
                            nextLabel={'Siguiente'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(this.state.participaciones.length/20)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                          />
                        </center> 
                        <ul className="collapsible">
                          {participacionesActivas}
                        </ul>                      
                      </div>
                      :     
                      <ul className="collapsible">
                        {participaciones}
                      </ul>
                    :this.state.participaciones.length>50?
                    <div>
                      <center>
                        <ReactPaginate
                          previousLabel={'Anterior'}
                          nextLabel={'Siguiente'}
                          breakLabel={'...'}
                          breakClassName={'break-me'}
                          pageCount={Math.ceil(this.state.participaciones.length/50)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={this.handlePageClick}
                          containerClassName={'pagination'}
                          subContainerClassName={'pages pagination'}
                          activeClassName={'active'}
                        />
                      </center> 
                      <ul className="collapsible">
                        {participacionesActivas}
                      </ul>                      
                    </div>
                    :     
                    <ul className="collapsible">
                      {participaciones}
                    </ul>            
                  }                  

                </div>
                : 
                <div>
                  <br></br>              
                  <center><h5>No hay participaciones aún</h5></center>
                </div>
              }
            </div>
            <br></br>
        </div>        
    )
  }
}

export default ContestProfile;