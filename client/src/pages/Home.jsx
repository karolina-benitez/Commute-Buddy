import React, { Component } from 'react';
import '../../src/App.css'
import SignInButton from '../components/SignInButton'

class Home extends Component {
  render() {
    return (
      <div className='Home'>
        <SignInButton />
        <h1>Commute Buddy</h1>
      </div>
    );
  }
}

export default Home;
