import React, { Component } from 'react';
import '../App.css';
import { Button, Form } from 'react-bootstrap';

class AddressContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newuserdata: this.props.userdata,
      newaddress: ''
    }
  }

  handleNewAddress = (event) => {
    this.setState({
      newaddress: event.target.value
    });
  }

  render() {
    const userdata = this.state.newuserdata
    const useraddresses = userdata.map((useraddress) =>
      <li>
        {useraddress.address}
      </li>
    )
    return (
      <div className="addressContainer">
        <h4>Your Addresses</h4>
        <div>
          <ul>
            {useraddresses}
          </ul>
          <ul>
            {this.state.newAddress}
          </ul>
        </div>

        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter address"
              type="text"
              onChange={this.handleNewAddress}
              value={this.state.newaddress}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add New Address
        </Button>
        </Form>
      </div>
    )
  }
}

export default AddressContainer;
