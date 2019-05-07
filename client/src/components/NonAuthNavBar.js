import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

class NonAuthNavBar extends React.Component {

  render() {
    return (
      <div className='App-header'>
        <Navbar className='navMain'>
          <Navbar.Brand className='navMain' >Commute Buddy</Navbar.Brand>
          <Nav className="mr-auto">
            <Link to='/' className='navLink'> Main </Link>
            <Link to='/about' className='navLink'>About </Link>
            <Link to='/signin' className='navLink'>Sign In </Link>
          </Nav>
        </Navbar>
      </div>
    )

  }
}

export default NonAuthNavBar