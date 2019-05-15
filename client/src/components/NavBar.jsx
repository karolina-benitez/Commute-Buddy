import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import fire from '../config/Fire';

// const navStyle = {
//   marginTop: '10%',
//   backgroundColor: 'white'
// };

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }
  logout() {
    fire.auth().signOut();
  }


  //   
  //     
  //       <Nav.Link href="/" className='hamburgerLink'>Main</Nav.Link>
  //       <Nav.Link href="/about" className='hamburgerLink'>About</Nav.Link>
  //       <Nav.Link href="/signin" className='hamburgerLink'>Sign In</Nav.Link>
  //     </Nav>
  //   </Navbar.Collapse>
  // </Navbar>
  //       </div >
  //     )
  //   }
  render() {
    // const userdata = this.props.userdata
    return (
      <div className='App-header navMain'>
        {/* <Container> */}
        <Navbar collapseOnSelect expand="true" className='navMain' fixed="top">
          <Navbar.Brand href="/" className='navMain'>Commute Buddy</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className='signInHamburgerNav' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/main" className='hamburgerLink navLink'>Home</Nav.Link>
              <Nav.Link href="/selection" className='hamburgerLink navLink'>Routes</Nav.Link>
              <Nav.Link href="/usersettings" className='hamburgerLink navLink'>Settings</Nav.Link>
              <Nav.Link href="/" onClick={this.logout} className='hamburgerLink navLink'>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )

  }
}

export default NavBar
