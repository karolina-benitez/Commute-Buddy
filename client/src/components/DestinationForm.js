import React, { Component } from 'react';
import { Form, Col, Row, Dropdown } from 'react-bootstrap'
import DateTime from '../components/DateTime';

class DestinationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAddress: ''
    }
  }
  handleAddressChange = (event) => {
    this.setState({
      selectedAddress: event.target.defaultValue
    })
    console.log('itworks')
  }
  handleClick = (useraddress) => {
    this.setState({
      selectedAddress: useraddress.address
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
    )
    return (
      <div className="destinationForm">
        <Form>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Destination
              </Form.Label>
            <Col sm={3}>
              <Form.Control
                type="text"
                placeholder="Address"
                defaultValue={this.state.selectedAddress || ''}
                onChange={this.handleAddressChange}
              />
            </Col>
            <Col sm={3}>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                  Your Destinations
                  </Dropdown.Toggle>
                <Dropdown.Menu>
                  {useraddresses}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col sm={3}>
              <DateTime />
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default DestinationForm;

