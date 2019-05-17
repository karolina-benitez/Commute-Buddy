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
import NavBar from './components/NavBar'

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
      error: null,
      isLoaded: false,
      userdata: []
    };
  }

  //~~~~~~~~~~~~~~ User Authentication~~~~~~~~~~~~~~~~~~~~~~~~
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

  componentDidMount() {
    this.authListener();
  }
  //**********************************************************/

  //~~~~~~~~~~~~~~ Update User Info ~~~~~~~~~~~~~~~~~~~~~~~~

  handleEditUser = (email, firstname, lastname, phonenumber, trafficalert, weatheralert, eventalert, transitalert) => {
    const user = {
      firstname,
      lastname,
      phonenumber,
      trafficalert,
      weatheralert,
      eventalert,
      transitalert,
    }
    fetch(`/notifications/${email}`, {
      method: 'put',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(newEvent => {
        const events = this.state.events.map(event => {
          return (parseInt(event.id) === parseInt(newEvent.id)) ? newEvent : event;
        });
        this.setState({ events });//TODO: update variables to user
      })

  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //~~~~~~~~~~~~~~ Ueer Trip Data ~~~~~~~~~~~~~~~~~~~~~~~~
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.user)
    if (this.state.user) {
      if (!prevState.isLoaded) {
        // console.log(this.state.user.email)
        let userID = this.state.user.email
        console.log(userID)
        fetch(`/udata/${userID}`)
          .then(res => res.json())
          .then(
            (result) => {
              // console.log(userID)
              console.log(result)
              console.log('!!!!!!!!💃🏻 it worked 💃🏻!!!!!!!!!!')
              this.setState({
                isLoaded: true,
                userdata: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    }
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~ 'Get' User data from DB ~~~~~~~~~~~~~~~~~~~~~~~~
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.user)
    if (this.state.user) {
      if (!prevState.isLoaded) {
        // console.log(this.state.user.email)
        let userID = this.state.user.email
        console.log(userID)
        fetch(`/udata/${userID}`)
          .then(res => res.json())
          .then(
            (result) => {
              // console.log(userID)
              console.log(result)
              console.log('!!!!!!!!💃🏻 it worked 💃🏻!!!!!!!!!!')
              this.setState({
                isLoaded: true,
                userdata: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    }
  }

  render() {
    // console.log(this.state.user)
    // console.log(this.state.userdata)
    const { error /*, userdata, isLoaded */ } = this.state;
    // console.log(userdata)
    if (error) {
      return <div>Error: {error.message}</div>;
      // } else if (!isLoaded) {
      //   return <div>
      //     Loooooooooaddddding
      //     </div>
    } else {
      return (
        <div className="App">
          <Router>
            <div>
              <Route exact path='/'
                component={Home} />
              <Route path='/signin'
                component={SignIn} />
              <Route path='/about'
                component={About} />
              <PrivateRoute path='/main'
                component={MainPage}
                isAuth={this.state.user}
                userdata={this.state.userdata} />
              <PrivateRoute path='/usersettings'
                component={UserSettings}
                isAuth={this.state.user}
                userdata={this.state.userdata} />
              <PrivateRoute path='/notifications'
                component={Notifications}
                isAuth={this.state.user}
                userdata={this.state.userdata} />
              <PrivateRoute path='/selection'
                component={SelectedRoute}
                isAuth={this.state.user}
                userdata={this.state.userdata} />
              <PrivateRoute path='/navbar'
                component={NavBar}
                isAuth={this.state.user}
                userdata={this.state.userdata} />
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
