import React, { Component } from 'react';

import UserProfile from "../userComponents/UserProfile";

export default class Body extends Component {
  render() {
    return (
      <Switch>
        {this.props.currentUser ?
          <div>
            <Route path="/historial/:usuario" component={ContestFromURL}/>
            <Route path="/explorar/:usuario" component={ContestFromURL}/>
            <Route path="/perfil/:usuario" component={() => <UserProfile currentUser={props.currentUser} />}/>
          </div>
          :
          <div>
            <Route exact path="/home" component={ContestFromURL}/>
            <Route path="/login" component={ContestFromURL}/>
            <Route path="/signup" component={ContestFromURL}/>
          </div>
        }
      </Switch>
    );
  }
}
