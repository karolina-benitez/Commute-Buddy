import React, { Component } from 'react';
import '../../src/App.css'
import SignInButton from '../components/SignInButton'
// import SFvid from '../../src/videos/SFvid.mp4'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoURL: ''
    }
  }

  render() {
    return (
      <div className='Home'>
        {/* <video id="background-video" loop autoPlay>
          <source src={this.state.SFvid} type="video/mp4" />
          <source src={this.state.SFvid} type="video/ogg" />
          Your browser does not support the video tag.
            </video> */}
        <SignInButton />
        <h1>Commute Buddy</h1>
      </div>
    );
  }
}

export default Home;
