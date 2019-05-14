import React, { Component } from 'react';
/* global google */
// const API = 'AIzaSyAhVWhFdizN56yFD2Wf7Q1O_cOZHofdab4';
const google = window.google;


const AutocompleteDirectionsHandler = (map) => {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'WALKING';
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(map);

  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');
  var modeSelector = document.getElementById('mode-selector');

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

  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
    destinationInput);
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}

AutocompleteDirectionsHandler.prototype.setupClickListener = (id, mode) => {
  var radioButton = document.getElementById(id);
  var me = this;

  radioButton.addEventListener('click', function () {
    me.travelMode = mode;
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = (autocomplete, mode) => {
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
AutocompleteDirectionsHandler.prototype.route = () => {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  this.directionsService.route(
    {
      origin: { 'placeId': this.originPlaceId },
      destination: { 'placeId': this.destinationPlaceId },
      travelMode: this.travelMode
    },
    function (response, status) {
      if (status === 'OK') {
        me.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
};

export class GoogleTripsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      origin: this.props.origin,
      destination: this.props.destination,
      arrivedate: new Date(),
      newuserdata: this.props.userdata,
      userRequestedRoutes: false
    }
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
      // const destination = { lat: 37.7749, lng: -122.4194 }
      //{ lat: 37.7749, lng: -122.4194 };
      const map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 14
      });

    });
    this.directionsHandler = new AutocompleteDirectionsHandler(this.map)
  }

  render() {

    return (
      <div>
        <div>
          {/* <div style={{ display: 'none' }}> */}
          <input id="origin-input" className="controls" type="text"
            placeholder="Enter an origin location" />

          <input id="destination-input" className="controls" type="text"
            placeholder="Enter a destination location" />

          <div id="mode-selector" className="controls">
            <input type="radio" name="type" id="changemode-walking" checked="checked" />
            <label htmlFor="changemode-walking">Walking</label>

            <input type="radio" name="type" id="changemode-transit" />
            <label htmlFor="changemode-transit">Transit</label>

            <input type="radio" name="type" id="changemode-driving" />
            <label htmlFor="changemode-driving">Driving</label>
          </div>
        </div>
        <div id="map" style={{ width: '100%', height: 600 }}></div>
      </div>
    );
  }
}

export default GoogleTripsTable
