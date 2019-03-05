import React, {Component} from 'react';
import { error } from 'util';

class SignUp extends Component{

  constructor(){
    super();
    this.state = {
      user_names:'',
      user_lastnames:'',
      user_password_confirm:'',
      user_email:'',
      user_password:'',
      user_image: ''     
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
      
    if(this.state.user_password != this.state.user_password_confirm){
      M.toast({html:'Las contraseñas no coinciden', classes: 'rounded'});
    }
    else if(this.state.user_password.length < 8){
      M.toast({html:'La contraseña debe tener 8 caracteres mínimo', classes: 'rounded'});
    }   
    else if(this.state.user_password == '' || this.state.user_names == '' || this.state.user_lastnames == '' || this.state.user_email == '' || this.state.user_image == ''){
      M.toast({html:'Ingresa valores válidos para registrarse', classes: 'rounded'});
    }
    else{
      const nuevoUser = {user_names: this.state.user_names,user_lastnames:this.state.user_lastnames, user_email:this.state.user_email, user_password: this.state.user_password, user_image: this.state.user_image};
      
      fetch('/api/user',{
        method: 'POST',
        body: JSON.stringify(nuevoUser),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}).then(res => {              
          if(res.ok){
            return res.json();                
          } 
          else{
            throw new Error("Ya existe una cuenta de usuario con este correo electrónico");
        }}).then(data => {
          M.toast({html:'Se ha creado la cuenta correctamente', classes: 'rounded'});
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

            <center><h6>Regístrate en ArtistFM. Recuerda que los datos ingresados son los que necesitarás 
                    para iniciar sesión una vez te registres.</h6></center>
            <br></br>
            <div className="row">
                <form className="col s12">
                    <div className = "container">
                      <center><h5>Ingresa tus datos</h5></center>
                      <br></br>
                      <div className="row">
                          <div className="input-field col s6">
                              <input id="user_names" type="text" className="validate" onChange = {this.handleInput}/>
                              <label htmlFor="user_names">Nombres</label>
                          </div>
                          <div className="input-field col s6">
                              <input id="user_lastnames" type="text" className="validate" onChange = {this.handleInput}/>
                              <label htmlFor="user_lastnames">Apellidos</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <input id="user_image" type="text" className="validate" onChange = {this.handleInput}/>
                              <label htmlFor="user_image">Imagen de perfil</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <input id="user_email" type="email" className="validate" onChange = {this.handleInput}/>
                              <label htmlFor="user_email">Correo Electrónico</label>
                              <span className="helper-text" data-error="No es válido" data-success="Es válido">Escribe tu correo...</span>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                          <input id="user_password" type="password" className="validate" onChange = {this.handleInput}/>
                          <label htmlFor="user_password">Contraseña</label>
                          <span className="helper-text">Debe tener mínimo 8 caracteres</span>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                          <input id="user_password_confirm" type="password" className="validate" onChange = {this.handleInput}/>
                          <label htmlFor="user_password_confirm">Confirmación contraseña</label>
                          <span className="helper-text">Vuelve a escribir tu contraseña</span>
                          </div>
                      </div>  
                    </div>                  
                </form>

                <br></br>
                <center><a onClick ={this.handleSubmit} className="waves-effect waves-light btn cyan darken-4">Registrarse</a></center>
            </div>
        </div>
    )
  }
}

export default SignUp;
