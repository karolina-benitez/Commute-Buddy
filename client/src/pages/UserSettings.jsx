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

  handleNewUser = (uid, firstname, lastname, phonenumber, email, trafficalert, eventalert, weatheralert, transitalert) => {
    const data = {
      uid,
      firstname,
      lastname,
      phonenumber,
      email,
      trafficalert,
      eventalert,
      weatheralert,
      transitalert
    }
    fetch(`/newUser`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((info) => { console.log(info); })
  }

  handleEditUser = (firstname, lastname, phonenumber, email, trafficalert, eventalert, weatheralert, transitalert) => {
    const data = {
      firstname,
      lastname,
      phonenumber,
      email,
      trafficalert,
      eventalert,
      weatheralert,
      transitalert
    }

    fetch(`/udata/${email}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((info) => { console.log(info); })
  }

  submitHandler = (e) => {
    e.preventDefault()
    if (this.props.userdata[0].email === this.props.isAuth.email) {
      this.handleEditUser(
        this.state.firstname,
        this.state.lastname,
        this.state.phonenumber,
        this.state.email,
        this.state.trafficalert,
        this.state.eventalert,
        this.state.weatheralert,
        this.state.transitalert,
      );
    } else {
      this.handleNewUser(
        this.props.isAuth.uid,
        this.state.firstname,
        this.state.lastname,
        this.state.phonenumber,
        this.props.isAuth.email,
        this.state.trafficalert,
        this.state.eventalert,
        this.state.weatheralert,
        this.state.transitalert,
      );
    }
  }
  //~~~~~~ form state~~~~~~~~~
  render() {
    const userdata = this.props.userdata
    return (
      <div className='authenitcatedPageBG'>
        <NavBar userdata={userdata} />
        <div className="userSettingsContent">
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
            <Button variant="light" size="sm" className='darkButton' href="/main">
              Back
        </Button>
            <Button variant="light" size="sm" className='darkButton' type="submit">
              Submit
          </Button>
          </Form>


        </div>
      </div>

    )
  }
}

export default UserSettings;
