import React from 'react'
import { Table, Form } from 'react-bootstrap'

class RouteTable extends React.Component {
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
              <Form.Check type="radio" aria-label="radio 1" />
              <td>Driving</td>
              <td>N/A</td>
              <td>75 mins</td>
              <td>9:10 AM</td>
            </tr>
            <tr>
              <Form.Check type="radio" aria-label="radio 1" />
              <td>Bus</td>
              <td>$5.50</td>
              <td>45 mins</td>
              <td>8:45 AM</td>
            </tr>
            <tr>
              <Form.Check type="radio" aria-label="radio 1" />
              <td>Ferry</td>
              <td>$7.00</td>
              <td>25 mins</td>
              <td>8:25 AM</td>

            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default RouteTable


// TODO: need to add radio buttons so that user can select preferred route




