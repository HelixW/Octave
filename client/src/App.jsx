import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';

// Authentication
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <ProtectedRoute path="/main" component={MainPage} />
      </Switch>
    </BrowserRouter>
  </>
);

export default App;
