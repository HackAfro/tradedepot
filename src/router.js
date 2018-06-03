import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Login, SignUp, Dashboard } from './components';
import UserProvider from './components/context/user.provider';

const Routes = () => (
  <Router>
    <UserProvider>
      <React.Fragment>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {/* <Route path="/reset-password" component={ForgotPassword} /> */}
      </React.Fragment>
    </UserProvider>
  </Router>
);

export default Routes;
