import React from 'react'
import NonAuthNavBar from '../components/NonAuthNavBar';

class About extends React.Component {
  render() {
    return (
      <div className='about'>
        <NonAuthNavBar />
        <h3>About Commute Buddy</h3>
        <h4>Tired of having to check multiple sources each morning in preparation for you commute? Let Commute buddy check traffic, weather, detours, and events for you! Commute buddy will notify you if anything occurs that will cause a delay in your daily commute and give you suggestions on alternate routes or ways to get to your destination
        </h4>
        <h3>How to use</h3>
        <h4>
          Enter your cell phone number to enable text notifications.
          <br />
          Enter your destination and arrival time
          <br />
          Select your preferred method of transportation
          <br />
          And let Commute Buddy do the rest of the work
          </h4>
        <h3>Contact us</h3>
        <h4>helloworld@commutebuddy.com</h4>
      </div>

    );

  }
}

export default About