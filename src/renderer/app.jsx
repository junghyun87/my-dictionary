import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Dic from './Dic';
import Config from './Config';

const appRouting = (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="dic" component={Dic} />
      <Route path="config" component={Config} />
    </Route>
  </Router>
);

if (!location.hash.length) {
  location.hash = '#/dic';
}

render(appRouting, document.getElementById('app'));
