import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, NavItem } from "react-materialize";



export default class Header extends Component {

  render() {
    if(this.props.currentUser){
      return(
        <Navbar className='cyan darken-1' brand='Songify' left>
          <NavItem><Link to={'/perfil/' + this.props.currentUser.userid} replace>Mi Perfil</Link></NavItem>
          <NavItem><Link to={'/historial/' + this.props.currentUser.userid} replace>Mi Historial</Link></NavItem>
          <NavItem><Link to={'/explorar/' + this.props.currentUser.userid} replace>Explorar</Link></NavItem>
          <NavItem onClick = {() => {this.props.logout()}}>Salir</NavItem>                      
        </Navbar>
      );
    }
    else{
      return(
        <Navbar className='cyan darken-1' brand='Songify' right> 
          <NavItem><Link to='login' replace>Iniciar sesión</Link></NavItem>
          <NavItem><Link to='signup' replace>Registrarse</Link></NavItem>
        </Navbar>
      );
    }
  }
}
