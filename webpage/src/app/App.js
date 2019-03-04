import React, {Component} from 'react';
import { Row, Col } from "react-materialize";
import { withRouter } from "react-router-dom";

import Header from "./components/structuralComponents/Header";
import Body from "./components/structuralComponents/Body";
import MyFooter from "./components/structuralComponents/Footer";

class App extends Component{

  constructor(){
    super();    
    this.state = {
      currentUser: {userid: 1}
    }    

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn(conectado){
    const idLogeado = conectado.idIdentified;
    fetch('/api/admin/'+idLogeado).then(res => res.json()).then(data => {        
        this.setState({
          currentUser: data
        });        
      });   
  }

  logOut() {    
    this.setState({
      currentUser: null
    }, () => this.props.history.push('/'));
    window.Materialize.toast('Su sesión ha sido cerrada exitosamente!', 10000);
  }

  render(){   
    return(
      <Row>
        <Col s={12}>
          <Header currentUser={this.state.currentUser} logout={this.logOut}/>
          <Body currentUser={this.state.currentUser}/>
          <MyFooter />
        </Col>
      </Row>
    );  
  }  
}

export default withRouter(App);