import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import fire from '../config/Fire';

const navStyle = {
  marginTop: '10%',
  backgroundColor: 'white'
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }
  logout() {
    fire.auth().signOut();
  }
  render() {
    // const userdata = this.props.userdata
    return (
      <div className='App-header navMain' style={navStyle}>
        {/* <Container> */}
        <Navbar expand="lg" fixed="top" style={{ backgroundColor: '#285128' }} >
          <Navbar.Brand className='navMain' style={{ color: 'white' }}>Commute Buddy</Navbar.Brand>
          <Nav className="mr-sm-2" >
            <Link to='/main' className='navLink' style={{ color: 'white' }}> Home </Link>
            <Link to='/selection' className='navLink' style={{ color: 'white' }}>Routes </Link>
            <Link to='/usersettings' className='navLink' style={{ color: 'white' }}>Settings </Link>
            <Link to='/'
              onClick={this.logout} className='navLink' style={{ color: 'white' }}>Sign Out</Link>
            {/* <div className='navgreet'>Welcome back {userdata[0].firstname}!</div> */}
          </Nav>
        </Navbar>
      </div>
    )

  }
}

export default NavBar