import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import UserProfile from "../userComponents/UserProfile";
import LogIn from '../LogIn';
import SignUp from '../SignUp';
import Home from '../Home';
import Explorar from "../userComponents/Explorar";
import Historial from "../userComponents/Historial";

export default class Body extends Component {
  render() {
    return (
      <Switch>
        {this.props.currentUser ?
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/historial/:usuario" component={Historial}/>
            <Route path="/explorar/:usuario" component={Explorar}/>
            <Route path="/perfil/:usuario" component={() => <UserProfile currentUser={this.props.currentUser} />}/>
          </div>
          :
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={LogIn}/>
            <Route path="/signup" component={SignUp}/>
          </div>
        }
      </Switch>
    );
  }
}
