import React, {Component} from 'react';
import {render} from 'react-dom';
import { BrowserRouter,Route, Link, Switch } from "react-router-dom";

import App from './App'
import ContestFromURL from './ContestFromURL'

render(
    <BrowserRouter>
        <Switch>
            <Route path="/:concurso" component={ContestFromURL}/>
            <Route path="/" component ={App} exact/>
        </Switch>
    </BrowserRouter>,
   document.getElementById('app'));