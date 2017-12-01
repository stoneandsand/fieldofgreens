import React from 'react';
import ItemInput from './iteminput.jsx';
import StateDropdown from './stateDropdown.jsx';
import Auth0Lock from 'auth0-lock';
import axios from 'axios';
const Lock = require('../../../Auth/Auth.js').Lock;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    this.props.auth.handleAuthentication();
    Lock.on('authenticated', (authStatus)=> {
      console.log('auth status: ', authStatus);

      if (!authResult.accessToken) {return};

      Lock.getUserInfo(authResult.accessToken, (err, profile)=> {
        console.log('err',err, 'profile',profile);

        axios.post('http://localhost:5000/signup',profile)
        .then( (success)=>{
          console.log('user data', success);
          window.location.reload();
        })
        .catch((err)=>{
          console.log('error',err);
        });
      })
    })
    Lock.on('authorization_error', (err)=>{
      console.log('auth error found: ', err);
    });
  }

  login() {
    Lock.show();
  }

  render() {
    const isLoggedIn = <h3><span id="logout" onClick={this.props.logout}>Logout</span> <span id="settings">Settings</span></h3>;
    const isNotLoggedIn = <h3 onClick={this.login}>Login/SignUp</h3>;
    return (
      <div className="container-fluid navigation">
        <div className="row top">
          <div className="col-md-4 loginOrOut">
            <h1>The Grossery List</h1>
          </div>
          <div className="col-md-4 search">
            <ItemInput addNewItemToList={this.props.addNewItemToList} newItemEntry={this.props.newItemEntry} updateNewItemEntry={this.props.updateNewItemEntry} />
          </div>
          <div className="col-md-4 signUpOrSettings">
            <StateDropdown location={this.props.location} selectState={this.props.selectState} />
            {
              this.props.isLoggedIn ? isLoggedIn : isNotLoggedIn
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;