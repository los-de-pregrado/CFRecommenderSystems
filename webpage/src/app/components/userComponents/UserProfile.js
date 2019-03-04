import React, {Component} from 'react';
import dateFormat from 'dateformat';

export default class UserProfile extends Component{

  constructor(){
    super();
    //const userId = this.props.match.params.usuario;

  }

  render(){
    return(      
        <div className = "container">
            <center><h5>Mi perfil</h5></center>
            <br></br>
            <div className = "container">
              <table>
                <tbody>
                  <tr>
                    <td><b>Identificador del Usuario</b></td>
                    <td>{this.props.currentUser.userid}</td>            
                  </tr>
                  <tr>
                    <td><b>Género</b></td>
                    <td>{this.props.currentUser.gender}</td>                
                  </tr>
                  <tr>
                    <td><b>Edad</b></td>
                    <td>{this.props.currentUser.age}</td>                
                  </tr>
                  <tr>
                    <td><b>País</b></td>
                    <td>{this.props.currentUser.country}</td>                
                  </tr>
                  <tr>
                    <td><b>Fecha de creación</b></td>
                    <td>{dateFormat(this.props.currentUser.sigup, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>               
                  </tr>
                </tbody>
              </table>
            </div>
        </div>        
    );
  }
}