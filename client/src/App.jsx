import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/main" component={MainPage} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
