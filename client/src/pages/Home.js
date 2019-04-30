import React, { Component } from 'react';
import '../../src/App.css'
import SignInButton from '../components/SignInButton'

class Home extends Component {
  render() {
    return (
      <div className='Home'>
        <SignInButton />
      </div>
    );
  }
}

export default Home;
