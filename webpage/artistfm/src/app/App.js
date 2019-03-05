import React, {Component} from 'react';


import Home from './components/Home'
import SignUp from './components/SignUp'
import LogIn from './components/LogIn'
import UserProfile from './components/userComponents/UserProfile'
import UserSearch from './components/userComponents/UserSearch'


class App extends Component{

  constructor(){
    super();    
    this.state = {
      iniciado: false,
      login: false,
      signup: false,
      idIniciado: 0,
      nombreIniciado: '',
      onSearch: false,
      ratings: []
    }    
    this.toLogin = this.toLogin.bind(this);
    this.toSignUp = this.toSignUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
    this.toHome = this.toHome.bind(this);
    this.toProfile = this.toProfile.bind(this);
    this.toSearch = this.toSearch.bind(this);
    this.getRatingsLogged= this.getRatingsLogged.bind(this);
  }

  toLogin(){
    this.setState({
      login: true,
      signup: false,
      iniciado: false      
    });
  }

  toSignUp(){
    this.setState({
      login: false,
      signup: true,
      iniciado: false
    });
  }

  toHome(){
    if(this.state.iniciado == false){
      this.setState({
        login: false,
        signup: false
      });   
    }    
  }

  logIn(conectado){
    const idLogeado = conectado.idIdentified;
    var nombreLogeado = '';
    fetch('/api/user/'+idLogeado).then(res => res.json()).then(data => {     
        nombreLogeado = data.user_names;        
        this.setState({
          login: false,
          signup: false,
          iniciado: true,
          idIniciado: idLogeado,
          nombreIniciado: nombreLogeado
        });        
      });   
  }

  toProfile(){
    this.setState({
      onSearch: false
    }); 
  }

  logOut(){    
    this.setState({
      login: false,
      signup: false,
      iniciado: false,
      idIniciado: 0,
      nombreIniciado : 0,
      onSearch : false,
      ratings: []
    });
    M.toast({html:'Sesión cerrada', classes: 'rounded'});
  }

  toSearch(){
    this.setState({
      onSearch: true
    });
  }

  getRatingsLogged(data){

  }

  render(){   

    return(
      
      <div>
        <div className="navbar-fixed">          
          <nav>
            <div className="nav-wrapper cyan darken-2">
              <div className = "row">
                <div className = "col s12">                
                  <a href="#" onClick = {this.toHome} className="brand-logo center">ArtistFM</a>
                  <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                  <ul id="nav-mobile" className="left hide-on-med-and-down">
                  {
                    this.state.iniciado?
                    <div>
                      <li><a onClick = {this.toProfile}>Mi perfil</a></li>
                      <li><a onClick = {this.toSearch}>Buscar</a></li>
                      <li><a className="modal-trigger" href="#confirmModal">Salir</a></li>                      
                    </div>
                    :
                    <div>
                      <li><a onClick = {this.toSignUp}>Registrarse</a></li>
                      <li><a onClick = {this.toLogin}>Iniciar sesión</a></li>
                    </div>
                  }                    
                  </ul>
                </div>
              </div>
            </div>
          </nav>          
        </div> 

        <br></br>
        
        {/* Modals */}

        <div id="confirmModal" className="modal">
          <div className="modal-content">
            <h4>Cerrar sesión</h4>
            <p>¿Estás seguro que deseas cerrar sesión?</p>
          </div>
          <div className="modal-footer">
            <a href="#" className="modal-close waves-effect waves-green btn-flat">No</a>
            <a onClick = {this.logOut} className="modal-close waves-effect waves-green btn-flat">Sí</a>
          </div>
        </div>

        {/* Barra lateral para dispositivos móviles */}

        { 
          this.state.iniciado?
          <ul className="sidenav" id="mobile-demo">      
              <li><a onClick = {this.toProfile}>Mi perfil</a></li>
              <li><a onClick = {this.toSearch}>Buscar</a></li>
              <li><a className="modal-trigger" href="#confirmModal">Salir</a></li>                        
          </ul>
          :
          <ul className="sidenav" id="mobile-demo">
            <li><a onClick = {this.toSignUp}>Registrarse</a></li>
            <li><a onClick = {this.toLogin}>Iniciar sesión</a></li>
          </ul>
        }

        {/* Componentes principales */}

        {
          this.state.login?
          <div>            
            <LogIn toSignUp = {this.toSignUp} enableLogIn = {this.logIn}/>
          </div>
          :this.state.signup?
          <div>
            <SignUp enableSignUp = {this.logIn}/>   
          </div>          
          :this.state.iniciado?
            this.state.onSearch?
            <div>
              <UserSearch idLogged = {this.state.idIniciado} ratings = {this.state.ratings}/>   
            </div> 
            :
            <div>
              <UserProfile idLogged = {this.state.idIniciado} getRatings = {this.getRatingsLogged}/>   
            </div>
          :
          <div>
            <Home/>   
          </div>
        }        

      </div>
    )     
  }  
}

export default App;
