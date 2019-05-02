import React from 'react'
import { Link } from 'react-router-dom'
// import * as ROUTES from '../constants/routes'
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
    return (
      <div className='App-header'>
        <Navbar className='navMain'>
          <Navbar.Brand className='navMain' >Commute Buddy</Navbar.Brand>
          <Nav className="mr-auto">
            <Link to='/' className='navLink'>Home </Link>
            <Link to='/main' className='navLink'>Main Page </Link>
            <Link to='/about' className='navLink'>About </Link>
            <Link to='/settings' className='navLink'>Settings </Link>
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