import React from 'react'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'


class RouteTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mapsResult: props.mapsResult,
      transitMethod: '',
      price: '',
      duration: '',
      arriveDate: ''
    }
  }

  componentDidUpdate(prevProps) {
    console.log('it changed!')

    if (this.props.mapsResult !== prevProps.mapsResult) {
      const route = this.props.mapsResult.routes[0];
      this.setState({
        transitMethod: this.props.mapsResult.request.travelMode,
        price: route.fare ? route.fare.text : "N/A",
        duration: this.props.mapsResult.routes[0].legs[0].duration.text,
        arriveDate: this.props.mapsResult.request.transitOptions.arrivalTime,
        mapsResult: this.props.mapsResult
      });
      console.log(this.props.mapsResult.request.travelMode)
    }
  }
  // componentDidMount() {
  //   this.setState({
  //     mapsResult: this.
  //   })
  // }

  render() {
    console.log(this.state.mapsResult)
    console.log(this.props.mapsResult)
    console.log(this.state.mapsResult)
    return (
      <div className='routeTable'>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Transit Method</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Arrive Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.transitMethod}</td>
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




