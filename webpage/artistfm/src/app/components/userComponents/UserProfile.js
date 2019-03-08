import React, {Component} from 'react';
import dateFormat from 'dateformat';

class UserProfile extends Component{

  constructor(props){
    super(props);    
    this.state={
        idLogged : this.props.idLogged,
        user:{},         
    }
    fetch('/api/user/'+this.state.idLogged).then(res => res.json()).then(data => {  
        this.setState({
          user:data
        });                        
      });  
  }
  
  componentDidMount(){
    document.dispatchEvent(new Event('component'));
    fetch('api/rating/byuser/'+this.state.idLogged).then(res=>res.json()).then(data=>{
      this.props.getRatings(data);
    }).catch(err => this.props.getPredictions([]));;

    fetch('http://172.24.101.30:8081/ranking').then(res=>res.json()).then(data=>{
      this.props.getRanking(data);
    }).catch(err => this.props.getPredictions([]));;

    fetch('http://172.24.101.30:8081/predict/'+this.state.idLogged).then(res=>res.json()).then(data=>{
      this.props.getPredictions(data);
    }).catch(err => this.props.getPredictions([]));
  }

  render(){
    
    return(
                
        <div className = "container">
            <div className = "row">
              <div className = "col s4">
                <center>
                  <img className="responsive-img" src={this.state.user.user_image}/>
                </center>
              </div>
              <div className = "col s8">
              
                <center><h5>Mi perfil</h5></center>
                <br></br>
                <div className = "container">
                  <table>
                    <tbody>
                      <tr>
                        <td><b>Nombre</b></td>
                        <td>{this.state.user.user_names}</td>            
                      </tr>
                      <tr>
                        <td><b>Apellidos</b></td>
                        <td>{this.state.user.user_lastnames}</td>                
                      </tr>
                      <tr>
                        <td><b>Correo electrónico</b></td>
                        <td>{this.state.user.user_email}</td>                
                      </tr>                
                      <tr>
                        <td><b>Fecha de creación</b></td>
                        <td>{dateFormat(this.state.user.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>               
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </div>        
    )
  }
}

export default UserProfile;