import React from 'react'
import NonAuthNavBar from '../components/NonAuthNavBar';

class About extends React.Component {
  render() {
    return (
      <div className='about'>
        <NonAuthNavBar />
        <h3>About Commute Buddy</h3>
        <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe inventore voluptate odit deleniti culpa distinctio, ipsam est soluta. Facere sit sed laudantium nostrum quam, provident excepturi tempore mollitia doloremque possimus.</h4>
        <h3>How to use</h3>
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolores praesentium ipsam aut, laborum rerum ratione nulla sint sit debitis nobis blanditiis assumenda amet error incidunt libero suscipit omnis consequuntur.</h4>
        <h3>Contact us</h3>
        <h4>helloworld@commutebuddy.com</h4>
      </div>

    );

  }
}

export default About