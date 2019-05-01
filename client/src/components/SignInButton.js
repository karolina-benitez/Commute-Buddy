import React from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'

class SignInButton extends React.Component {
  render() {
    return (
      <div>
        <ButtonToolbar bsPrefix='container'>
          <Button variant="light" size="md" className='button' href="/main">
            Sign In
          </Button>
          <Button variant="light" size="md" className='button' href="/main">
            Sign Up
          </Button>
        </ButtonToolbar>
      </div>
    );

  }
}

export default SignInButton