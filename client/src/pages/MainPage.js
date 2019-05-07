import React, { Component } from 'react';
import '../App.css';
import RouteTable from '../components/RouteTable';
// import GoogleMap from '../components/GoogleMaps/GoogleMap';
import DestinationForm from '../components/DestinationForm';
import NavBar from '../components/NavBar';
import { Button } from 'react-bootstrap';

class MainPage extends Component {

  render() {
    const userdata = this.props.userdata;
    console.log(this.props.userdata)
    console.log(userdata)
    return (
      <div className="destinationContainer">
        <NavBar userdata={userdata} />
        <hr />
        <DestinationForm userdata={userdata} />

        <RouteTable />
        <Button variant="link" className='button' href='selectedroute'>Select Route</Button>
        {/* <GoogleMap /> */}
        {/* <NewGoogleMap
            google={this.props.google}
            center={{ lat: 37.7749, lng: -122.4194 }}
            height='300px'
            zoom={15}
          /> */}
      </div>
    );
  }
  // }
}

export default MainPage;
