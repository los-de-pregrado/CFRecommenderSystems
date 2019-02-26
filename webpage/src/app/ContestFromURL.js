import React, {Component} from 'react';
import { Link } from "react-router-dom";

import ContestProfile from './components/contestComponents/ContestProfile'

class ContestFromURL extends Component{

  constructor(props){
    super(props);    
    this.state = {
      contest: null,
      error: ''
    } 
    const urlConcurso = this.props.match.params.concurso;
    fetch('/api/concursos/'+urlConcurso).then(res => res.json()).then(data => {   
      if(data.length == 0){
        throw new Error("No hay ningún concurso registrado con esta URL. Intente con otra.");
      }
      else{
        this.setState({
          contest:data[0]
        });  
      }                  
    }).catch(err=>{
      this.setState({
        error: err.message
      });
    });
  }  

  render(){   

    return(
      
      <div>
        <div className="navbar-fixed">          
          <nav>
            <div className="nav-wrapper red darken-4">
              <div className = "row">
                <div className = "col s12">                
                  <Link to="/" className="brand-logo center">Supervoices</Link>            
                </div>
              </div>
            </div>
          </nav>          
        </div> 

        <br></br>
        {
          this.state.contest==null?
            <div className="container">
              <center><h1>{this.state.error}</h1></center>              
            </div>
          :
          <ContestProfile contest = {this.state.contest} externo = {true}/>
        }       

      </div>
    )     
  }  
}

export default ContestFromURL;
