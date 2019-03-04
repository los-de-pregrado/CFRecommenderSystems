import React, {Component} from 'react';
import dateFormat from 'dateformat';

class UserProfile extends Component{

  constructor(props){
    super(props);    
    this.state={
        idLogged : this.props.idLogged,
        admin:{},         
    }
    fetch('/api/user/'+this.state.idLogged).then(res => res.json()).then(data => { 
        if(data.Contests == null){
          this.setState({
            admin:data
          });
        }                
      });    
  }
  
  componentDidMount(){
    document.dispatchEvent(new Event('component'));       
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
                  <td><b>Nombre</b></td>
                  <td>{this.state.admin.admin_names}</td>            
                </tr>
                <tr>
                  <td><b>Apellidos</b></td>
                  <td>{this.state.admin.admin_lastnames}</td>                
                </tr>
                <tr>
                  <td><b>Correo electrónico</b></td>
                  <td>{this.state.admin.admin_email}</td>                
                </tr>                
                <tr>
                  <td><b>Fecha de creación</b></td>
                  <td>{dateFormat(this.state.admin.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>               
                </tr>
              </tbody>
            </table>
            </div>
        </div>        
    )
  }
}

export default UserProfile;