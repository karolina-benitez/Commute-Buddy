// import React from 'react'
// import fire from '../config/Fire'
// import NonAuthNavBar from '../components/NonAuthNavBar';

// class SignUp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.signup = this.signup.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {
//       email: '',
//       password: ''
//     }
//   }
//   SignUp(e) {
//     e.preventDefault();
//     fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
//       console.log(error);
//     });
//   }

//   handleChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   render() {
//     return (
//       <div>
//         <NonAuthNavBar />
//         <h3 className='header3'>Create an account</h3>
//         <div className='col-md-6'>
//           <form>
//             <div class='form-group'>
//               <label for='exampleInputEmail'>Email Address</label>
//               <input value={this.state.email} onChange={this.handleChange} type="email" name='email' class='form-control' id='exampleInputEmail' aria-describedby='emailHelp' placeholder='Enter Email' />
//             </div>
//             <div>
//               <label for='exampleInputPassword1'>Password</label>
//               <input value={this.state.password} onChange={this.handleChange} type="password" name='password' class='form-control' id='exampleInputPassword' aria-describedby='emailHelp' placeholder='Password' />
//             </div>
//             <button onClick={this.signup} style={{ marginLeft: '25px' }} className='btn btn-success'>Sign Up</button>
//           </form>
//         </div>
//       </div>

//     );

//   }
// }

// export default SignUp

// // todo!!!!! center submit button