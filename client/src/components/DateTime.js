// import React from 'react'
// // import { Dropdown, Form, Col, Row } from 'react-bootstrap'
// import DatePicker from 'react-datepicker'


// class DateTime extends React.Component {
//   render() {
//     return (
//       <div className='dateTime'>
//         <DatePicker
//           selected={this.state.startDate}
//           onChange={this.handleChange}
//           showTimeSelect
//           timeFormat="HH:mm"
//           timeIntervals={15}
//           dateFormat="MMMM d, yyyy h:mm aa"
//           timeCaption="time"
//         />
//       </div>
//     )
//   }
// }

// export default DateTime

import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DateTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        timeCaption="time"
      />
    );
  }
}
export default DateTime