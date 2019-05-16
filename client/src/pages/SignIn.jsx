import React from 'react'
import fire from '../config/Fire'
import { Link } from 'react-router-dom'
import NonAuthNavBar from '../components/NonAuthNavBar';
import { Redirect } from 'react-router-dom'

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    }
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      console.log(error);
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidUpdate(prevProps) {
    if (this.state.email) {
      return (
        <Redirect
          to={{
            pathname: "/main"
          }}
        />
      )

    }
  }

  render() {
    return (
      <div className='signIn'>
        <NonAuthNavBar />
        <div className='signInContent'>
          <div className='form-group'>
            <label for='exampleInputEmail'>Email Address</label>
            <input value={this.state.email} onChange={this.handleChange} type="email" name='email' className='form-control' id='exampleInputEmail' aria-describedby='emailHelp' placeholder='Enter Email' />
          </div>
          <div>
            <label for='exampleInputPassword1'>Password</label>
            <input value={this.state.password} onChange={this.handleChange} type="password" name='password' className='form-control' id='exampleInputPassword' aria-describedby='emailHelp' placeholder='Password' />
          </div>
          <div class='signInButton'>
            <Link href='/main'
              onClick={this.logout} className='navLink'>
              <button type='submit' href="/main" onClick={this.login} className='btn  button' >Login</button>
            </Link>
            <button onClick={this.signup} href="/main" style={{ marginLeft: '25px' }} className='btn  button'>Sign Up</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn