import React, { Component } from 'react';
import '../App.css';
import NotificationsButton from '../components/NotificationsButton'
import { Button, Form, Col } from 'react-bootstrap';
import NavBar from '../components/NavBar';

class UserSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      userEmail: '',
      password: '',
      password2: '',
      phonenumber: ''
    }
  }
  //~~~~~~ form state~~~~~~~~~
  render() {
    const userdata = this.props.userdata
    console.log(userdata)
    return (
      <div className="userSettings">
        <NavBar userdata={userdata} />
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Current Email" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Phone Number (Must be able to receive text notifications)</Form.Label>
            <Form.Control placeholder="Phone Number" />
          </Form.Group>

          <NotificationsButton />
          <Button variant="link" className='button' href='main' type="submit">
            Submit
            </Button>
        </Form>


      </div>
    )
  }
}

export default UserSettings;
