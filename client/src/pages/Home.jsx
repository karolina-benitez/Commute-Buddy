import React, { Component } from 'react';
import '../../src/App.css'
import SignInButton from '../components/SignInButton'

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <h1>Commute Buddy</h1>
        <SignInButton />
      </div>
    );
  }
}

export default Home;
