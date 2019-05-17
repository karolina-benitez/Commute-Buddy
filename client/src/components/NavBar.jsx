import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import fire from '../config/Fire';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
    this.state = {
      userName: '',
      userLastname: ''
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.userdata !== prevProps.userdata) {
      this.setState({
        userName: this.props.userdata[0].firstname,
        userLastname: this.props.userdata[0].lastname
      });
    }
  }

  logout() {
    fire.auth().signOut();
  }
  render() {
    const userdata = this.props.userdata
    console.log(userdata)

    return (
      <div className='App-header navMain'>
        {/* <Container> */}
        <Navbar collapseOnSelect expand="true" className='navMain' fixed="top">
          <Navbar.Brand href="/main" className='navMain'>Commute Buddy</Navbar.Brand>
          <div className='navgreet'> {this.state.userName} {this.state.userLastname}</div>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className='signInHamburgerNav' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/main" className='hamburgerLink navLink'>Home</Nav.Link>
              <Nav.Link href="/selection" className='hamburgerLink navLink'>Trips</Nav.Link>
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
