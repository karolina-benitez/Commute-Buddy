import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import MainPage from './pages/MainPage'
import UserSettings from './pages/UserSettings';
import Notifications from './pages/Notifications';
import SelectedRoute from './pages/SelectedRoute'
import About from './pages/About';
import fire from './config/Fire';
// import * as ROUTES from './constants/routes'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        rest.isAuth ? (
          <Component {...props} {...rest} />
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
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={SignIn} />
            <Route path='/about' component={About} />
            <PrivateRoute path='/main' component={MainPage} isAuth={this.state.user} exact />
            <PrivateRoute path='/settings' component={UserSettings} isAuth={this.state.user} exact />
            <PrivateRoute path='/notifications' component={Notifications} isAuth={this.state.user} exact />
            <PrivateRoute path='/selection' component={SelectedRoute} isAuth={this.state.user} exact />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
