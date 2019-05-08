import React, { Component } from 'react';
import { Form, Col, Row, Dropdown, Button } from 'react-bootstrap'
import DateTime from '../components/DateTime';
// import Autocomplete from 'react-google-autocomplete';


class DestinationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startLocation: '',
      destination: '',
      newuserdata: this.props.userdata,
      isLoaded: false,
      googleAPI: []
    }
    console.log(this.state.newuserdata)
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
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  componentDidMount() {
    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=383%20Dolores%20Street,%20San%20Francisco,%20CA%2094110&destination=85%20Bluxome%20St,%20San%20Francisco,%20CA%2094107&key=AIzaSyDOvkQbCSQuh0G7F8cEqm2G6igPby0rJ9c&mode=transit&alternative=true`)
      // .then(res => res.json())
      .then(
        (result) => {
          console.log(result.routes)
          console.log('!!!!!!!!💃🏻 it worked 💃🏻!!!!!!!!!!')
          this.setState({
            isLoaded: true,
            googleAPI: result
          });
        },
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    console.log(this.state.googleAPI)
    let userdata = this.props.userdata
    // console.log(userdata)
    // console.log(this.state.newuserdata)

    const useraddresses = this.state.newuserdata.map((useraddress) =>
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
        <Button variant="link" className='button' href='/selection'>Select Route</Button>

      </div>
    );
  }
}

export default DestinationForm;

