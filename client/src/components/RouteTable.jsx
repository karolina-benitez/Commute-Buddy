import React from 'react'
import { Button, Table, Alert } from 'react-bootstrap'


class RouteTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapsResult: props.mapsResult,
      show: false,
      uid: '',
      originid: '',
      originaddress: '',
      destinationid: '',
      destinationaddress: '',
      transitMethod: '',
      price: '',
      duration: '',
      departDate: '',
      arriveDate: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.mapsResult !== prevProps.mapsResult) {
      const route = this.props.mapsResult.routes[0];
      const request = this.props.mapsResult.request;
      this.setState({
        uid: this.props.userData[0].uid,
        originid: request.origin.placeId,
        originaddress: route.legs[0].start_address,
        destinationid: request.destination.placeId,
        destinationaddress: route.legs[0].end_address,
        transitMethod: request.travelMode,
        price: route.fare ? route.fare.text : "N/A",
        duration: route.legs[0].duration.text,
        departDate: route.fare ? route.legs[0].departure_time.text : "N/A",
        arriveDate: route.fare ? route.legs[0].arrival_time.text : "N/A",
        mapsResult: this.props.mapsResult
      });
      console.log(this.props.mapsResult.request.travelMode)
    }
  }

  handleNewTrip = (uid, originid, originaddress, destinationid, destinationaddress, departDate, arriveDate) => {
    const data = {
      uid,
      originid,
      originaddress,
      destinationid,
      destinationaddress,
      departDate,
      arriveDate
    }
    fetch(`/newTrip`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((result) => result.json())
      .then((info) => { console.log(info); })
  }
  submitHandler = (e) => {
    e.preventDefault()
    this.handleNewTrip(
      this.state.uid,
      this.state.originid,
      this.state.originaddress,
      this.state.destinationid,
      this.state.destinationaddress,
      this.state.departDate,
      this.state.arriveDate
    );
    this.setState({
      show: true
    })
  }
  handleHide = (e) => {
    this.setState({
      show: false,
      originid: '',
      destinationid: '',
      transitMethod: '',
      price: '',
      duration: '',
      departDate: '',
      arriveDate: '',
    });
  }


  render() {
    console.log(this.state.originId)
    console.log(this.state.destinationId)
    console.log(this.state.arriveDate)
    console.log(this.state.uid)
    return (
      <div className='routeTable'>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Transit Method</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Depart Time</th>
              <th>Arrive Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.transitMethod}</td>
              <td>{this.state.price}</td>
              <td>{this.state.duration}</td>
              <td>{this.state.departDate}</td>
              <td>{this.state.arriveDate}</td>
            </tr>
          </tbody>
        </Table>
        <Alert show={this.state.show} variant="success">
          <Alert.Heading>Your trip was saved!</Alert.Heading>
          <div className="d-flex justify-content-end">
            <Button onClick={this.handleHide} variant="outline-success">
              Done
            </Button>
          </div>
        </Alert>
        <Button variant="light"
          onClick={this.submitHandler} className='darkButton'> Select Trip </Button>
      </div>
    )
  }
}

export default RouteTable


// TODO: need to add radio buttons so that user can select preferred route




