import React, { Component } from 'react';
import { Form, Col, Row, Dropdown, Button } from 'react-bootstrap'
import DateTime from '../components/DateTime';
// import Autocomplete from 'react-google-autocomplete';


class DestinationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startLocation: '',
      destination: ''
    }
  }
  //~~~~~~~~~~~~Start Address~~~~~~~
  handleStartLocation = (event) => {
    this.setState({
      startLocation: event.target.defaultValue
    })
    console.log('itworks')
  }
  handleClick = (useraddress) => {
    this.setState({
      startLocation: useraddress.address
    })
    console.log(useraddress)
  }
  //~~~~~~~~~~~~Destination Address~~~~~~~~~~~~
  handleSelectedAddress = (event) => {
    this.setState({
      destination: event.target.defaultValue
    })
    console.log('itworks')
  }
  handleClick2 = (useraddress) => {
    this.setState({
      destination: useraddress.address
    })
    console.log(useraddress)
  }
  render() {
    let userdata = this.props.userdata
    const useraddresses = userdata.map((useraddress) =>
      <Dropdown.Item onClick={() => { this.handleClick(useraddress) }}
        key={useraddress.id}>
        {useraddress.address}
      </Dropdown.Item>
    )//start address
    const useraddresses2 = userdata.map((useraddress) =>
      <Dropdown.Item onClick={() => { this.handleClick2(useraddress) }}
        key={useraddress.id}>
        {useraddress.address}
      </Dropdown.Item>
    )//destination address
    return (
      <div className="destinationForm">
        <Form>
          {/************* Start Address ***************/}
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={1}>
              Start Location
              </Form.Label>
            <Col sm={4}>
              {/* <Autocomplete /> */}
              <Form.Control
                type="text"
                placeholder="Address"
                defaultValue={this.state.startLocation || ''}
                onChange={this.handleStartLocation}
              />
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
                onChange={this.handleSelectedAddress}
              />
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
            <Col sm={2}>
              <DateTime />
            </Col>
            <Col sm={2}>
              <Button variant="light"> Select </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default DestinationForm;

