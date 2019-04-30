import React from 'react'
import { Navbar } from 'react-bootstrap'

class Header extends React.Component {
  render() {
    return (
      <div className='App-header'>
        <>
          <Navbar>
            <Navbar.Brand className='headerMain'>Commute Buddy</Navbar.Brand>
          </Navbar>
        </>
      </div>
    )

  }
}

export default Header

