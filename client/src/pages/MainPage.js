import React, { Component } from 'react';
import '../App.css';
import DateTime from '../components/DateTime';
import RouteTable from '../components/RouteTable';
import GoogleMap from '../components/GoogleMaps/GoogleMap';
import DestinationForm from '../components/DestinationForm';
import NavBar from '../components/NavBar';
import { Button } from 'react-bootstrap';


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      userdata: []
    };
  }
  componentDidMount() {
    fetch('/udata')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          console.log('it worked')
          this.setState({
            isLoaded: true,
            userdata: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const user = this.props.user
    console.log(user)
    const { error, isLoaded, userdata } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <div className="destinationContainer">
          <NavBar userdata={userdata} />
          <hr />
          <DestinationForm />
          <DateTime />
          <RouteTable />
          <Button variant="link" className='button' href='selectedroute'>Select Route</Button>
          <GoogleMap />
        </div>
      );
    }
  }
}

export default MainPage;

