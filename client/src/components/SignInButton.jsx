import React from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'

const buttonStyle = {
  borderRadius: '12px',
}
class SignInButton extends React.Component {
  render() {
    return (
      <div>
        <ButtonToolbar bsPrefix='container'>
          <Button variant="light" size="md" className='button' href="/signin" style={buttonStyle}>
            Get Started
          </Button>
        </ButtonToolbar>
      </div>
    );

  }
}

export default SignInButton