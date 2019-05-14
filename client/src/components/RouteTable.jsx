import React from 'react'
import { Table /*, Form */ } from 'react-bootstrap'

class RouteTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      origin: this.props.origin,
      destination: this.props.destination,
      arrivedate: new Date(),
      newuserdata: this.props.userdata,
      userRequestedRoutes: false
    }
  }

  componentDidUpdate(prevProps) {

    // check: did the user request routes
    //did we already make the api req with the same origin/destination
    // how to revert select button back to false
  }

  render() {

    return (
      <div className='routeTable'>



        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th></th>
              <th>Transit Options</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Arrive By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <Form.Check type="radio" aria-label="radio 1" /> //TODO:find radio button alternative, cannot have inside <tr> */}
              <td></td>
              <td>{this.props.origin}</td>
              <td>{this.props.destination}</td>
              <td>75 mins</td>
              <td>9:10 AM</td>

            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default RouteTable


// TODO: need to add radio buttons so that user can select preferred route




