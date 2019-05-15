import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

class NonAuthNavBar extends React.Component {

  render() {
    return (
      <div className='App-header nonAuthNav'>
        <Navbar collapseOnSelect expand="true" className='navMain'>
          <Navbar.Brand href="/" className='navMain'>Commute Buddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className='signInHamburgerNav' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/" className='hamburgerLink'>Main</Nav.Link>
              <Nav.Link href="/about" className='hamburgerLink'>About</Nav.Link>
              <Nav.Link href="/signin" className='hamburgerLink'>Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default NonAuthNavBar