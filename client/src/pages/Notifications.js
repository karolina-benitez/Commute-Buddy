import React, { Component } from 'react';
import '../App.css';
import { Form, Button } from 'react-bootstrap'
import NavBar from '../components/NavBar';

class Notifications extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h3>Select Notification types</h3>
        <Form >
          {
            ['checkbox'].map(type => (
              <div key={`default-${type}`} className="mb-3">
                <Form.Label>Traffic Alert</Form.Label>
                <Form.Check
                  aria-label="traffic alert"
                />
                <Form.Label>Event Alert</Form.Label>
                <Form.Check
                  aria-label="Event Alert"
                />
                <Form.Label>Weather Alert</Form.Label>
                <Form.Check
                  aria-label="Weather Alert"
                />
                <Form.Label>Public transit delay Alert</Form.Label>
                <Form.Check
                  aria-label="Public transit Alert"
                />
              </div>
            ))
          }
        </Form >
        <Button variant="link" className='button' href='usersettings'>Update Notifications</Button>
      </div>
    )
  }
}

export default Notifications;



