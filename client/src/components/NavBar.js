import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import fire from '../config/Fire';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }
  logout() {
    fire.auth().signOut();
  }
  render() {
    const userdata = this.props.userdata
    console.log(userdata)
    return (
      <div className='App-header'>
        <Navbar className='navMain'>
          <Navbar.Brand className='navMain' >Commute Buddy</Navbar.Brand>
          <Nav className="mr-auto">
            <Link to='/main' className='navLink'> Home </Link>
            <Link to='/selection' className='navLink'>Routes </Link>
            <Link to='/usersettings' className='navLink'>Settings </Link>
            <Link to='/'
              onClick={this.logout} className='navLink'>Sign Out</Link>
            <div className='navgreet'>Welcome back {userdata[0].firstname}!</div>
          </Nav>
        </Navbar>
      </div>
    )

  }
}

export default NavBar