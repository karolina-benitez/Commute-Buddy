import React from 'react'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


class RouteTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapsResult: this.props.response,
      transitMethod: '',
      price: '',
      duration: '',
      arriveDate: ''
    }
  }

  componentDidUpdate(prevProps) {

    if (prevProps.mapResults !== this.state.mapResults) {
      this.setState({
        transitMethod: this.props.mapsResult.request.transitOptions.travelMode,
        price: this.state.mapsResult.routes[0].fare.text,
        duration: this.state.mapsResultroutes[0].legs[0].duration.text,
        arriveDate: this.state.mapsResult.request.transitOptions.arrivalTime
      });
    }
  }

  render() {
    console.log(this.state.mapsResult)
    console.log(this.props.mapResult)
    console.log(this.props.mapResult2)
    return (
      <div className='routeTable'>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th></th>
              <th>Transit Method</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Arrive Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.travelMode}</td>
              <td>{this.state.price}</td>
              <td>{this.state.duration}</td>
              <td>{this.state.arriveDate}</td>
            </tr>
          </tbody>
        </Table>
        <Button variant="light"
          onClick={() => { this.handleSelectButton() }} className='darkButton'> Select Trip </Button>
      </div>
    )
  }
}

export default RouteTable


// TODO: need to add radio buttons so that user can select preferred route




