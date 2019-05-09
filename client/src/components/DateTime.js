import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class DateTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrivedate: new Date(),
      handleArriveDate: this.props.handleArriveDate
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      arrivedate: date
    });
  }

  render() {
    return (
      <DatePicker
        selected={this.state.arrivedate}
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