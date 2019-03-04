import React, {Component} from 'react';

class LogIn extends Component{

  constructor(props){
    super(props);
    this.state = {      
      user_email:'',
      user_password:'' 
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

  handleSubmit(){
    var identified = false;
    var idIdentified = 0;
    fetch('/api/user').then(res => res.json()).then(data => {      
        data.forEach( (dat) => {
            if(dat.user_email == this.state.user_email && dat.user_password == this.state.user_password)
            {
                idIdentified = dat.id;
                identified = true;
            }
        });  
        
        if(identified == true){
            M.toast({html:'Sesión iniciada', classes: 'rounded'});
            this.props.enableLogIn({idIdentified});
        }             
        else if(this.state.user_password == '' || this.state.user_email == ''){
            M.toast({html:'Ingresa valores válidos para iniciar sesión', classes: 'rounded'});
        }
        else{
            M.toast({html:'Correo electrónico sin registrar o contraseña incorrecta', classes: 'rounded'});
        }       
    });
  }

  componentDidMount(){
    document.dispatchEvent(new Event('component'));
  }

  render(){
    return(
        <div className = "container">

            <center><h6>Si no tienes una cuenta registrada, puedes crearla <a href="#" onClick={this.props.toSignUp}>registrándote</a>.</h6></center>
            <br></br>
            <div className="row">
                
                <form className="col s12">
                    <div className = "container">
                        <center><h5>Inicia sesión</h5></center>
                        <br></br>                    
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="user_email" type="email" className="validate" onChange = {this.handleInput}/>
                                <label htmlFor="user_email">Correo Electrónico</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="user_password" type="password" className="validate" onChange = {this.handleInput}/>
                            <label htmlFor="user_password">Contraseña</label>
                            </div>
                        </div>
                    </div>              
                </form>

                <br></br>

                <center><a onClick ={this.handleSubmit} className="waves-effect waves-light btn cyan darken-4">Iniciar Sesión</a></center>
                               
            </div>            
        </div>      
        
    )
  }
}

export default LogIn;