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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user: {}
  //   }
  // }

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      isLoaded: false,
      userdata: [],
    };
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

  // componentDidMount() {
  //   this.authListener();
  //   console.log(this.state.user)
  //   let userID = this.state.user.email
  //   console.log(userID)
  //   fetch(`/udata/${userID}`)
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         console.log(userID)
  //         console.log(result)
  //         console.log('it worked')
  //         this.setState({
  //           isLoaded: true,
  //           userdata: result
  //         });
  //       },
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }

  componentDidMount() {
    this.authListener();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    console.log('prevprops', prevProps)
    console.log('prevstate', prevState)
    const user = this.state.user
    console.log(this.state.user.email)
    if (prevState.user !== this.state.user) {
      // if (this.state.user.email !== this.user.email) {
      console.log("I got here", this.state.user)
      console.log(this.state.user.email)
      let userID = this.state.user.email
      console.log(userID)
      fetch(`/udata/${userID}`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(userID)
            console.log(result)
            console.log('it worked')
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

  render() {
    console.log(this.state.user)
    console.log(this.state.userdata)
    const { error, isLoaded, userdata } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>
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
                isAuth={this.state.user} />
              <PrivateRoute path='/settings'
                component={UserSettings}
                isAuth={this.state.user} />
              <PrivateRoute path='/notifications'
                component={Notifications}
                isAuth={this.state.user} />
              <PrivateRoute path='/selection'
                component={SelectedRoute}
                isAuth={this.state.user} />
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
