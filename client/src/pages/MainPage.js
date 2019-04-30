import React, { Component } from 'react';
import '../App.css';
import DateTime from '../components/DateTime';
import RouteTable from '../components/RouteTable';
import GoogleMap from '../components/GoogleMaps/GoogleMap';
import DestinationForm from '../components/DestinationForm';
import NavBar from '../components/NavBar';
import { Button } from 'react-bootstrap';

class MainPage extends Component {
  render() {
    return (
      <div className="destinationContainer">
        <NavBar />
        <hr />
        <DestinationForm />
        <DateTime />
        <RouteTable />
        <Button variant="link" className='button' href='selectedroute'>Select Route</Button>
        <GoogleMap />
      </div>
    )
  }
}

export default MainPage;
