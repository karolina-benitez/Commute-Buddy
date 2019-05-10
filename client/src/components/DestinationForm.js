import React, { Component } from 'react';
import { Form, Col, Row, Dropdown, Button } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DestinationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      origin: '',
      destination: '',
      arrivedate: new Date(),
      newuserdata: this.props.userdata,
      isLoaded: false,
      googleAPI: []
    }
  }
  //~~~~~~ Change data state ~~~~~~~~~~~~~
  handleOrigin = (event) => {
    this.setState({
      origin: event.target.value
    });
  }
  handleDestination = (event) => {
    this.setState({
      destination: event.target.value
    });
  }
  handleChange = (date) => {
    this.setState({
      arrivedate: date
    });
  }
  //~~~~~~~~~~~~ Select Origin~~~~~~~
  handleClick = (useraddress) => {
    this.setState({
      origin: useraddress.address
    })
  }
  //~~~~~~~~~~~~Select Destination~~~~~~~~~~~~
  handleClick2 = (useraddress) => {
    this.setState({
      destination: useraddress.address
    })
  }

  render() {
    let userdata = this.props.userdata

    //start address
    const useraddresses = this.state.newuserdata.map((useraddress) =>
      <Dropdown.Item
        onClick={() => { this.handleClick(useraddress) }}
        key={useraddress.id}
        onChange={this.handleOrigin}>
        {useraddress.address}
      </Dropdown.Item>
    )

    //destination address
    const useraddresses2 = userdata.map((useraddress) =>
      <Dropdown.Item
        onClick={() => { this.handleClick2(useraddress) }}
        key={useraddress.id}
        onChange={this.handleDestination}>
        {useraddress.address}
      </Dropdown.Item>
    )
    console.log(this.handleArriveDate)

    return (
      <div className="destinationForm">
        <Form>
          {/************* Start Address ***************/}
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={1}>
              Start Location
              </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="text"
                placeholder="Address"
                defaultValue={this.state.origin || ''}
                onChange={this.handleOrigin}
                value={this.state.origin} />
            </Col>
            <Col sm={2}>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                  Your Destinations
                  </Dropdown.Toggle>
                <Dropdown.Menu>
                  {useraddresses}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Group>
          {/************* Destination ***************/}
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={1}>
              Destination
              </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="text"
                placeholder="Address"
                defaultValue={this.state.destination || ''}
                onChange={this.handleDestination}
                value={this.state.destination} />
            </Col>
            <Col sm={2}>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                  Your Destinations
                  </Dropdown.Toggle>
                <Dropdown.Menu>
                  {useraddresses2}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
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
              />
            </Col>
            <Col sm={1}>
              <Button variant="light"> Select </Button>
            </Col>
          </Form.Group>
        </Form>
        <Button
          variant="link"
          className='button'
          href='/selection'>
          Select Route
        </Button>
      </div>
    );
  }
}

export default DestinationForm;

// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   // componentDidMount() {
//   //   fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=383%20Dolores%20Street,%20San%20Francisco,%20CA%2094110&destination=85%20Bluxome%20St,%20San%20Francisco,%20CA%2094107&key=AIzaSyDOvkQbCSQuh0G7F8cEqm2G6igPby0rJ9c&mode=transit&alternative=true`)
//   //     // .then(res => res.json())
//   //     .then(
//   //       (result) => {
//   //         console.log(result.routes)
//   //         console.log('!!!!!!!!💃🏻 it worked 💃🏻!!!!!!!!!!')
//   //         this.setState({
//   //           isLoaded: true,
//   //           googleAPI: result
//   //         });
//   //       },
//   //       (error) => {
//   //         console.log(error)
//   //         this.setState({
//   //           isLoaded: true,
//   //           error
//   //         });
//   //       }
//   //     )
//   // }
//   //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   // componentDidUpdate(prevProps, preveState) {
//   //   if (this.state.origin !== null && this.state.destination !== null) {

//   //   }
//   // }
// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~