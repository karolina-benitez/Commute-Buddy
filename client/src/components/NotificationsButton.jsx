import React, { Component } from 'react';
import '../App.css';
import { Button } from 'react-bootstrap'

class NotificationsButton extends Component {
  render() {
    return (
      <div>
        <Button variant="light" size="sm" className='darkButton' href="/notifications">
          Notifications Settings
        </Button>
      </div>
    )
  }
}

export default NotificationsButton;
