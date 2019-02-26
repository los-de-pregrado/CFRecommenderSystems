import React, {Component} from 'react';
import { error } from 'util';

class SignUp extends Component{

  constructor(){
    super();
    this.state = {
      admin_names:'',
      admin_lastnames:'',
      admin_password_confirm:'',
      admin_email:'',
      admin_password:''      
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
      
    if(this.state.admin_password != this.state.admin_password_confirm){
      M.toast({html:'Las contraseñas no coinciden', classes: 'rounded'});
    }
    else if(this.state.admin_password.length < 8){
      M.toast({html:'La contraseña debe tener 8 caracteres mínimo', classes: 'rounded'});
    }   
    else if(this.state.admin_password == '' || this.state.admin_names == '' || this.state.admin_lastnames == '' || this.state.admin_email == ''){
      M.toast({html:'Ingresa valores válidos para registrarse', classes: 'rounded'});
    }
    else{
      const nuevoAdmin = {admin_names: this.state.admin_names,admin_lastnames:this.state.admin_lastnames, admin_email:this.state.admin_email, admin_password: this.state.admin_password};
      
      fetch('/api/admin',{
        method: 'POST',
        body: JSON.stringify(nuevoAdmin),
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}).then(res => {              
          if(res.ok){
            return res.json();                
          } 
          else{
            throw new Error("Ya existe una cuenta de administrador con este correo electrónico");
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

            <center><h6>Regístrate como administrador. Recuerda que los datos ingresados son los que necesitarás 
                    para iniciar sesión una vez te registres. <strong>Cuando inicies sesión, podrás agregar, 
                      eliminar y gestionar los concursos.</strong></h6></center>
            <br></br>
            <div className="row">
                <form className="col s12">
                    <div className = "container">
                      <center><h5>¿Quién es el administrador?</h5></center>
                      <br></br>
                      <div className="row">
                          <div className="input-field col s6">
                              <input id="admin_names" type="text" className="validate" onChange = {this.handleInput}/>
                              <label htmlFor="admin_names">Nombres</label>
                          </div>
                          <div className="input-field col s6">
                              <input id="admin_lastnames" type="text" className="validate" onChange = {this.handleInput}/>
                              <label htmlFor="admin_lastnames">Apellidos</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <input id="admin_email" type="email" className="validate" onChange = {this.handleInput}/>
                              <label htmlFor="admin_email">Correo Electrónico</label>
                              <span className="helper-text" data-error="No es válido" data-success="Es válido">Escribe tu correo...</span>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                          <input id="admin_password" type="password" className="validate" onChange = {this.handleInput}/>
                          <label htmlFor="admin_password">Contraseña</label>
                          <span className="helper-text">Debe tener mínimo 8 caracteres</span>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                          <input id="admin_password_confirm" type="password" className="validate" onChange = {this.handleInput}/>
                          <label htmlFor="admin_password_confirm">Confirmación contraseña</label>
                          <span className="helper-text">Vuelve a escribir tu contraseña</span>
                          </div>
                      </div>  
                    </div>                  
                </form>

                <br></br>
                <center><a onClick ={this.handleSubmit} className="waves-effect waves-light btn red darken-3">Registrarse</a></center>
            </div>
        </div>
    )
  }
}

export default SignUp;
