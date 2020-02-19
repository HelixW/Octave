import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
