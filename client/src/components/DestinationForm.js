import React, { Component } from 'react';
import { Form, Col, Row, Dropdown } from 'react-bootstrap'
import DateTime from '../components/DateTime';


class DestinationForm extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     error: null,
  //     isLoaded: false,
  //     userdata: [],
  //   };
  // }
  // componentDidUpdate(prevProps) {
  //   if (prevProps && prevProps.isAuth.email !== this.props.isAuth.email) {
  //     let userID = this.props.isAuth.email
  //     console.log(userID)
  //     fetch(`/udata/${userID}`)
  //       .then(res => res.json())
  //       .then(
  //         (result) => {
  //           console.log(userID)
  //           console.log('it worked')
  //           this.setState({
  //             isLoaded: true,
  //             userdata: result
  //           });
  //         },
  //         (error) => {
  //           this.setState({
  //             isLoaded: true,
  //             error
  //           });
  //         }
  //       )
  //   }
  // }
  render() {
    let userdata = this.props.userdata
    const useraddresses = userdata.map(useraddress =>
      <Dropdown.Item >
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

