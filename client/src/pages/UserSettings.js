import React, { Component } from 'react';
import '../App.css';
import { Button, Form } from 'react-bootstrap';
import NavBar from '../components/NavBar';

class UserSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: this.props.isAuth.uid,
      firstname: '',
      lastname: '',
      phonenumber: '',
      email: this.props.isAuth.email,
      trafficalert: false,
      eventalert: false,
      weatheralert: false,
      transitalert: false,
      userdata: this.props.userdata
    }
  }
  handleTraffic = (e) => {
    console.log('handletraffic')
    this.setState({
      trafficalert: !this.state.trafficalert
    });
  }
  handleEvent = (e) => {
    this.setState({
      eventalert: !this.state.eventalert
    });
  }
  handleWeather = (e) => {
    this.setState({
      weatheralert: !this.state.weatheralert
    });
  }
  handleTransit = (e) => {
    this.setState({
      transitalert: !this.state.transitalert
    });
  }
  submitHandler = (e) => {

    const data = {
      uid: this.props.isAuth.uid,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phonenumber: this.state.phonenumber,
      email: this.props.isAuth.email,
      trafficalert: this.state.trafficalert,
      eventalert: this.state.eventalert,
      weatheralert: this.state.weatheralert,
      transitalert: this.state.transitalert,
    }
    e.preventDefault()
    fetch(`/newUser`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((info) => { console.log(info); })
    console.log(this.state)
  }

  //~~~~~~ form state~~~~~~~~~
  render() {

    const userdata = this.props.userdata
    return (
      <div className="userSettings">
        <NavBar userdata={userdata} />
        <h3>Update Profile</h3>
        <Form onSubmit={this.submitHandler}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={this.state.firstname}
              onChange={e => this.setState({ firstname: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={this.state.lastname}
              onChange={e => this.setState({ lastname: e.target.value })} />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Phone Number (Must be able to receive text notifications)
            </Form.Label>
            <Form.Control
              type='text'
              placeholder="Phone Number"
              value={this.state.phonenumber}
              onChange={e => this.setState({ phonenumber: e.target.value })} />
          </Form.Group>
          {/*~~~~~~~~ Notification Preferences ~~~~~~~~~~~~~ */}
          <h3>Select Notification types</h3>
          <p>
            Traffic Alert
            <br></br>
            <input type="checkbox"
              onChange={this.handleTraffic} />
          </p>
          <p>
            Weather Alert
            <br></br>
            <input type="checkbox"
              onChange={this.handleWeather} />
          </p>
          <p>
            Transit Alert
            <br></br>
            <input type="checkbox"
              onChange={this.handleTransit} />
          </p>
          <p>
            Event Alert
            <br></br>
            <input type="checkbox"
              onChange={this.handleEvent} />
          </p>
          {/*~~~~~~~~ submit button ~~~~~~~~~~~~~ */}
          <Button variant="link" className='button' type="submit">
            Submit
          </Button>
        </Form>
        <Button variant="link" href='main'>
          Back to Settings
        </Button>

      </div>
    )
  }
}

export default UserSettings;
