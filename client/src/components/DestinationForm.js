import React, { Component } from 'react';
// import './App.css';
import { Form, Col, Row, Dropdown } from 'react-bootstrap'

class DestinationForm extends Component {
  render() {
    let userdata = this.props.userdata
    return (
      <div className="destinationForm">
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Select your destination
              </Form.Label>
            <Col sm={10}>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                  Your Destinations
                  </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item >Address #1
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Group>
        </Form>
        <Form>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              New Destination
              </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Address" />
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default DestinationForm;

