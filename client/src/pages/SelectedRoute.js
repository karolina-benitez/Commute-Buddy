import React, { Component } from 'react';
import '../App.css';
import { Table } from 'react-bootstrap'
import NavBar from '../components/NavBar';
import NotificationsButton from '../components/NotificationsButton';


class Notifications extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h3>We'll Notify you of any changes</h3>
        <h5>Selected Route</h5>
        <h5>Arrive by: April 30, 2019 @ 8:25 AM</h5>
        <div className='routeTable' >
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Transit Option</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Arrive By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ferry</td>
                <td>$7.00</td>
                <td>25 mins</td>
                <td>8:25 AM</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <NotificationsButton />
      </div>
    )
  }
}

export default Notifications;



