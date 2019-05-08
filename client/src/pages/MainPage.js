import React, { Component } from 'react';
import '../App.css';
import RouteTable from '../components/RouteTable';
// import GoogleMap from '../components/GoogleMaps/GoogleMap';
import DestinationForm from '../components/DestinationForm';
import NavBar from '../components/NavBar';
import { Button } from 'react-bootstrap';

class MainPage extends Component {

  render() {
    const userdata = this.props.userdata
    console.log(this.props.userdata)
    console.log(userdata)
    return (
      <div className="destinationContainer">
        <NavBar userdata={userdata} />
        <hr />
        <DestinationForm userdata={userdata} />
        <RouteTable userdata={userdata} />
        {/* <GoogleMap /> */}
      </div>
    );
  }
  // }
}

export default MainPage;
