import React, {Component} from 'react';
import { error } from 'util';

class NewArtist extends Component{

  constructor(){
    super();
    this.state = {
      artist_name: '',
      artist_musicbrainz: '',
      artist_image: '' 
    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  handleInput(e){
    const {value, id} = e.target;
    this.setState({
      [id]: value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    var identified = false;    
  
    if(this.state.artist_image == '' || this.state.artist_musicbrainz == '' || this.state.artist_name == ''){
      M.toast({html:'Ingresa valores válidos para un nuevo artista', classes: 'rounded'});
    }
    else{
      const nuevoArtista = this.state;

      fetch('/api/artist',{
        method: 'POST',
        body: JSON.stringify(nuevoArtista),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}).then(res => {              
          if(res.ok){
            return res.json();                
          } 
          else{
            throw new Error("Ya existe un artista con ese musicbrainz index");
        }}).then(data => {
          M.toast({html:'Se ha creado el artista correctamente', classes: 'rounded'});
            const idIdentified = data.id;            
            this.props.enableSignUp({idIdentified});  
        }).catch(error => M.toast({html:error.message, classes: 'rounded'}));   
    } 
  }

  componentDidMount(){
    document.dispatchEvent(new Event('component'));
  }

  render(){
    return(
        <div className = "container">

            <center><h6>Crea nuevos artistas para aumentar la red de músicos en nuestra página.</h6></center>
            <br></br>
            <div className="row">
                <form className="col s12">
                    <div className = "container">
                      <center><h5>Ingresa los datos del músico</h5></center>
                      <br></br>
                      <div className="row">
                          <div className="input-field col s6">
                              <input id="artist_name" type="text" className="validate" onChange = {this.handleInput}/>
                              <label htmlFor="artist_name">Nombre</label>
                          </div>
                          <div className="input-field col s6">
                              <input id="artist_musicbrainz" type="text" className="validate" onChange = {this.handleInput}/>
                              <label htmlFor="artist_musicbrainz">Musicbrainz</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <input id="artist_image" type="text" className="validate" onChange = {this.handleInput}/>
                              <label htmlFor="artist_image">Imagen</label>
                          </div>
                      </div>                      
                    </div>                  
                </form>

                <br></br>
                <center><a onClick ={this.handleSubmit} className="waves-effect waves-light btn cyan darken-4">Crear</a></center>
            </div>
        </div>
    )
  }
}

export default NewArtist;
