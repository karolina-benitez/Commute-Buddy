import React from 'react'
import { Dropdown, Form, Col, Row } from 'react-bootstrap'

class DateTime extends React.Component {
  render() {
    return (
      <div className='dateTime'>
        <Form>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Arrive By
              </Form.Label>
            <Col sm={10}>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" >
                  Date and Time picker
                  </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Address #1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Address #2</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Address #3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Group>
        </Form>
      </div>
    )
  }
}

export default DateTime

