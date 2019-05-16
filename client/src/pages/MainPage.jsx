import React, { Component } from 'react';
import '../App.css';
import DestinationForm from '../components/DestinationForm';
import NavBar from '../components/NavBar';

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      origin: '',
      destination: '',
      arrivedate: new Date(),
      newuserdata: this.props.userdata,
      isLoaded: false,
      googleAPI: [],
      userRequestedRoutes: false
    }
  }

  render() {
    const userdata = this.props.userdata
    return (
      <div className="mainContainer " >
        <NavBar userdata={userdata} isAuth={this.props.isAuth} style={{ margin: 1000 }} />
        <div className='mainContent mainPgStyle'>
          <DestinationForm
            userdata={userdata}
            origin={this.state.origin}
            destination={this.state.destination}
            arrivedate={this.state.arrivedate} />
        </div>

      </div>
    );
  }
}

export default MainPage;
