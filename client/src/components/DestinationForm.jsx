import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RouteTable from './RouteTable';
const google = window.google;

class DestinationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      origin: this.originPlaceId,
      destination: this.destinationInput,
      arrivedate: new Date(),
      newuserdata: this.props.userdata,
      isLoaded: false,
      mapsResults: {}
    }
  }


  AutocompleteDirectionsHandler = (map) => {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;

    this.travelMode = 'WALKING';
    this.traffic_model = 'best_guess'; //TODO: check if works
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(map);

    var originInput = document.getElementById('origin-input');
    var destinationInput = document.getElementById('destination-input');
    var modeSelector = document.getElementById('mode-selector');
    this.arrival_date = new Date();

    var originAutocomplete = new google.maps.places.Autocomplete(originInput);
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(['place_id']);

    var destinationAutocomplete =
      new google.maps.places.Autocomplete(destinationInput);
    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(['place_id']);

    this.setupClickListener('changemode-walking', 'WALKING');
    this.setupClickListener('changemode-transit', 'TRANSIT');
    this.setupClickListener('changemode-driving', 'DRIVING');

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    this.map.controls.push(originInput);
    this.map.controls.push(
      destinationInput);
    this.map.controls.push(modeSelector);
  }

  setupClickListener = (id, mode) => {
    var radioButton = document.getElementById(id);
    var me = this;

    radioButton.addEventListener('click', function () {
      me.travelMode = mode;
      me.route();
    });
  };

  setupPlaceChangedListener = (autocomplete, mode) => {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      if (!place.place_id) {
        window.alert('Please select an option from the dropdown list.');
        return;
      }
      if (mode === 'ORIG') {
        me.originPlaceId = place.place_id;
      } else {
        me.destinationPlaceId = place.place_id;
      }
      me.route();
    });
  };

  route = () => {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }
    var me = this;

    this.directionsService.route(
      {
        origin: { 'placeId': this.originPlaceId },
        destination: { 'placeId': this.destinationPlaceId },
        travelMode: this.travelMode,
        transitOptions: {
          arrivalTime: this.arrival_date
        }
      },
      (response, status) => {
        if (status === 'OK') {
          me.directionsDisplay.setDirections(response);
          console.log('did it work', response)
          this.setState({
            mapsResults: response
          })

        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  };
  handleChange = (date) => {
    // this.setState({
    //   arrivedate: date
    // });
    this.arrival_date = date;
    this.route();
  }

  getGoogleMaps() {
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        window.resolveGoogleMapsPromise = () => {
          resolve(google);
          delete window.resolveGoogleMapsPromise;
        };
        const script = document.createElement("script");
        const API = 'AIzaSyAhVWhFdizN56yFD2Wf7Q1O_cOZHofdab4';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&libraries=places&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }
    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    this.getGoogleMaps().then((google) => {
      const map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 14
      });
      this.directionsHandler = this.AutocompleteDirectionsHandler(map)
    });
  }
  render() {
    // console.log(this.response)
    console.log(this.state.mapsResults)
    // let userdata = this.props.userdata
    // console.log(userdata)
    return (
      <div className="destinationForm">
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Start Location
              </Form.Label>
            <Col sm={4}>
              <Form.Control
                onChange={this.handleOrigin}
                value={this.originInput}
                id="origin-input"
                className="controls"
                type="text"
                placeholder="Enter an origin location" />
            </Col>
            <Form.Label column sm={1}>
              Destination
              </Form.Label>
            <Col sm={4}>
              <Form.Control
                onChange={this.handleDestination}
                value={this.destinationInput}
                id='destination-input'
                className="controls"
                type="text"
                placeholder="Enter destination address"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Arrive By
              </Form.Label>
            <Col sm={3}>
              <DatePicker
                selected={this.state.arrivedate}
                onChange={this.handleChange}
                // onChange={this.handleArriveDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
                value={this.state.arrivedate}
                id="arrival-selector"
              />
            </Col>
            <Col sm={5} >
              <input type="radio" name="type" id="changemode-walking" style={{ marginRight: '16px' }} />
              <label htmlFor="changemode-walking" style={{ marginRight: '16px' }}>Walking</label>

              <input type="radio" name="type" id="changemode-transit" style={{ marginRight: '16px' }} />
              <label htmlFor="changemode-transit" style={{ marginRight: '16px' }}>Transit</label>

              <input type="radio" name="type" id="changemode-driving" style={{ marginRight: '16px' }} />
              <label htmlFor="changemode-driving" style={{ marginRight: '16px' }}>Driving</label>
            </Col>
          </Form.Group>
        </Form>

        <RouteTable
          mapsResult={this.state.mapsResults}
        />
        <div>
          <div >
            <div style={{ display: 'none' }}>
              <div id="mode-selector" className="controls">
                <input type="radio" name="type" id="changemode-walking" checked="checked" />
                <label htmlFor="changemode-walking">Walking</label>

                <input type="radio" name="type" id="changemode-transit" />
                <label htmlFor="changemode-transit">Transit</label>

                <input type="radio" name="type" id="changemode-driving" />
                <label htmlFor="changemode-driving">Driving</label>
              </div>
            </div>
            <div id="map" style={{ width: '100%', height: 400, border: 'none' }}></div>
          </div>
        </div>

      </div>
    );
  }
}

export default DestinationForm;



    // console.log(this.response.routes[0].legs[0].duration.text)
    // console.log(this.response.routes[0].legs[0].distance.text)
    //console.log(this.response.routes[0].fare.text)
    //console.log(this.response.routes[0].legs[0].arrivalTime)
    // console.log(this.response.request.origin.travelMode)    //start address