import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
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
    const userdata = this.props.userdata
    return (
      <div className='App-header' className='navMain' style={navStyle}>
        {/* <Container> */}
        <Navbar expand="lg" fixed="top" style={{ backgroundColor: '#aca9a4' }} >
          <Navbar.Brand className='navMain'>Commute Buddy</Navbar.Brand>
          <Nav className="mr-sm-2">
            <Link to='/main' className='navLink'> Home </Link>
            <Link to='/selection' className='navLink'>Routes </Link>
            <Link to='/usersettings' className='navLink'>Settings </Link>
            <Link to='/'
              onClick={this.logout} className='navLink'>Sign Out</Link>
            {/* <div className='navgreet'>Welcome back {userdata[0].firstname}!</div> */}
          </Nav>
        </Navbar>
      </div>
    )

  }
}

export default NavBar