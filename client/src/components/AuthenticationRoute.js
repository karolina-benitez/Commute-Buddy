import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
}
  from "react-router-dom";
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import MainPage from '../pages/MainPage'
import UserSettings from '../pages/UserSettings';
import Notifications from '../pages/Notifications';
import SelectedRoute from '../pages/SelectedRoute'
import About from '../pages/About';
//import fire from './config/Fire';
import * as ROUTES from '../constants/routes'

function AuthRoutes() {
  return (
    <Router>
      <div>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.SIGNIN} component={SignIn} />
        <Route path={ROUTES.ABOUT} component={About} />
        <PrivateRoute path={ROUTES.MAINPAGE} component={MainPage} isAuth={this.state.user} exact />
        <PrivateRoute path={ROUTES.USERSETTINGS} component={UserSettings} isAuth={this.state.user} exact />
        <PrivateRoute path={ROUTES.NOTIFICATIONS} component={Notifications} isAuth={this.state.user} exact />
        <PrivateRoute path={ROUTES.SELECTEDROUTE} component={SelectedRoute} isAuth={this.state.user} exact />
      </div>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        this.state.user ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default AuthRoutes;

// https://codesandbox.io/s/1q9z6yz87?from-embed
// https://tylermcginnis.com/react-router-protected-routes-authentication/