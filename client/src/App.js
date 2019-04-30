import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import MainPage from './pages/MainPage'
import UserSettings from './pages/UserSettings';
import Notifications from './pages/Notifications';
import SelectedRoute from './pages/SelectedRoute'
import About from './pages/About';
import fire from './config/Fire';
import NavBar from './components/NavBar'
import * as ROUTES from './constants/routes'

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
      //console.log(user)
      if (user) {
        this.setState({ user });
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
            <NavBar />
            <hr />
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.SIGNIN} component={SignIn} exact />
            <Route path={ROUTES.MAINPAGE} component={MainPage} exact />
            <Route path={ROUTES.USERSETTINGS} component={UserSettings} exact />
            <Route path={ROUTES.NOTIFICATIONS} component={Notifications} exact />
            <Route path={ROUTES.SELECTEDROUTE} component={SelectedRoute} exact />
            <Route path={ROUTES.ABOUT} component={About} />
          </div>
          <div>
            {/* {this.state.user ? (<MainPage />) : (<SignIn />)} */}
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
