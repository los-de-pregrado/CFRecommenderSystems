import React, {Component} from 'react';
import { Row, Col, Container } from "react-materialize";

import Header from "./components/structuralComponents/Header";
import Body from "./components/structuralComponents/Body";
import Footer from "./components/structuralComponents/Footer";

class App extends Component{

  constructor(){
    super();    
    this.state = {
      nombreIniciado = '',
      currentUser: null
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

  logOut(){    
    this.setState({
      currentUser: null
    });
    M.toast({html:'Sesión cerrada', classes: 'rounded'});
  }

  render(){   
    return(
      <Container>
        <Row>
          <Col s={12}>
            <Header currentUser={this.state.currentUser}/>
            <Body currentUser={this.state.currentUser}/>
            <Footer />
          </Col>
        </Row>
      </Container>
    );  
  }  
}

export default App;
