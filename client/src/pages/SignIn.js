import React from 'react'
import fire from '../config/Fire'
import { Link } from 'react-router-dom'
import NonAuthNavBar from '../components/NonAuthNavBar';


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

  render() {
    return (
      <div>
        <NonAuthNavBar />
        <h3 className='header3'>Sign in</h3>
        <div className='col-md-6'>
          <form>
            <div className='form-group'>
              <label for='exampleInputEmail'>Email Address</label>
              <input value={this.state.email} onChange={this.handleChange} type="email" name='email' className='form-control' id='exampleInputEmail' aria-describedby='emailHelp' placeholder='Enter Email' />
            </div>
            <div>
              <label for='exampleInputPassword1'>Password</label>
              <input value={this.state.password} onChange={this.handleChange} type="password" name='password' className='form-control' id='exampleInputPassword' aria-describedby='emailHelp' placeholder='Password' />
            </div>
            <Link to='/main'
              onClick={this.logout} className='navLink'>
              <button type='submit' onClick={this.login} className='btn btn-primary' >Login</button>
            </Link>
            <button onClick={this.signup} style={{ marginLeft: '25px' }} className='btn btn-success'>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn