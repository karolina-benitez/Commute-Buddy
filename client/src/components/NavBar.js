import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
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
            <Link to={ROUTES.HOME} className='navLink'>Home </Link>
            <Link to={ROUTES.MAINPAGE} className='navLink'>Main Page </Link>

            <Link to={ROUTES.SIGNIN} className='navLink'>Sign In </Link>
            <Link to={ROUTES.ABOUT} className='navLink'>About </Link>
            <Link to={ROUTES.USERSETTINGS} className='navLink'>Settings </Link>
            <Link href="/" onClick={this.logout} className='navLink'>Sign Out</Link>
            <div className='navgreet'>Welcome back {userdata[0].firstname}!</div>
          </Nav>
        </Navbar>
      </div>
    )

  }
}

export default NavBar