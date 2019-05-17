import React, { Component } from 'react';
import '../App.css';
import { Table } from 'react-bootstrap'
import NavBar from '../components/NavBar';
import NotificationsButton from '../components/NotificationsButton';


class Notifications extends Component {
  render() {

    const usertrips = this.props.usertrips.map((usertrip, i) =>
      <tbody>
        <tr key={i}>
          <td>{usertrip.originaddress}</td>
          <td>{usertrip.destinationaddress}</td>
          <td>{usertrip.departdate}</td>
          <td>{usertrip.arrivedate}</td>
        </tr>
      </tbody>
    )
    console.log(this.props.usertrips)
    return (
      <div className='authenitcatedPageBG'>
        <NavBar userdata={this.props.userdata} />
        <div className='selectedRouteContent'>
          <h3 style={{ padding: '2%' }}>We'll Notify you of any changes</h3>
          <h5 style={{ padding: '2%' }}>Yout trips:</h5>
          <div className='routeTable' >
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Departure time</th>
                  <th>Arrival time</th>
                </tr>
              </thead>
              {usertrips}
            </Table>
          </div>
          <NotificationsButton style={{ padding: '4%' }} />
        </div>
      </div>
    )
  }
}

export default Notifications;



