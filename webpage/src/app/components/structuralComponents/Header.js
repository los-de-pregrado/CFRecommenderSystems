import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Header extends Component {

  render() {
    return (
      <div className="navbar-fixed">          
        <nav>
          <div className="nav-wrapper red darken-4">
            <Link to='/home' className={this.props.currentUser ? "brand-logo right": "brand-logo left"}>Songify Alpes</Link>
              <ul id="nav-mobile" className={this.props.currentUser ? "left hide-on-med-and-down": "right hide-on-med-and-down"}>
              {
                this.props.currentUser ?
                <div>
                  <li><Link to='/perfil'>Mi perfil</Link></li>
                  <li><Link to='/explorar'>Explorar</Link></li>
                  <li><Link to='/historial'>historial</Link></li>
                  <li><Link onclick = {this.props.logout}>Salir</Link></li>                      
                </div>
                :
                <div>
                  <li><Link to='/login'>Iniciar sesión</Link></li>
                  <li><Link to='/signup'>Registrarse</Link></li>
                </div>
              }                    
              </ul>   
          </div>
        </nav>          
      </div> 
    );
  }
}
