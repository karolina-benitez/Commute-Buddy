import React, { Component } from 'react';
import { Form, Col, Row, Dropdown } from 'react-bootstrap'
import DateTime from '../components/DateTime';


class DestinationForm extends Component {

  render() {
    let userdata = this.props.userdata
    function handleClick() {
      console.log(userdata.address);
    }
    const useraddresses = userdata.map(useraddress =>
      <Dropdown.Item onClick={() => { handleClick() }}>
        {useraddress.address}
      </Dropdown.Item>
    )
    console.log(useraddresses)
    return (
      <div className="destinationForm">
        <Form>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label column sm={2}>
              Destination
              </Form.Label>
            <Col sm={3}>
              <Form.Control type="text" placeholder="Address" />
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

