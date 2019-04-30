// import React from 'react'
// import { Navbar, Nav } from 'react-bootstrap'
// import fire from '../config/Fire';

//**********original navbar*********
// class NavBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.logout = this.logout.bind(this)
//   }
//   logout() {
//     fire.auth().signOut();
//   }
//   render() {
//     return (
//       <div className='App-header'>
//         <>
//           <Navbar>
//             <Navbar.Brand className='navMain'>Commute Buddy</Navbar.Brand>
//             <Nav className="mr-auto headerSub">
//               <Nav.Link href="/main" className="mr-auto">Home</Nav.Link>
//               <Nav.Link href="/userSettings">Settings</Nav.Link>
//               <Nav.Link href="/about">About</Nav.Link>
//               <Nav.Link href="/" onClick={this.logout}>Sign Out</Nav.Link>
//             </Nav>
//           </Navbar>
//         </>
//       </div>
//     );

//   }
// }

// export default NavBar

import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
import { Navbar, Nav } from 'react-bootstrap'
class NavBar extends React.Component {
  render() {
    return (
      <div className='App-header'>
        <Navbar className='navMain'>
          <Navbar.Brand className='navMain' >Commute Buddy</Navbar.Brand>
          <Nav className="mr-auto">
            <Link to={ROUTES.HOME} className='navLink'>Home </Link>
            <Link to={ROUTES.MAINPAGE} className='navLink'>Main Page </Link>
            <Link to={ROUTES.SELECTEDROUTE} className='navLink'>Selected Routes </Link>
            <Link to={ROUTES.SIGNIN} className='navLink'>Sign In </Link>
            <Link to={ROUTES.ABOUT} className='navLink'>About </Link>
            <Link to={ROUTES.USERSETTINGS} className='navLink'>Settings </Link>
          </Nav>
        </Navbar>
      </div>
    )

  }
}

export default NavBar