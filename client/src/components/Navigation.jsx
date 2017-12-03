import React from 'react';
import ItemInput from './ItemInput.jsx';
import StateDropdown from './StateDropdown.jsx';
import Auth0Lock from 'auth0-lock';
import axios from 'axios';
const Lock = require('../../../Auth/Auth.js').Lock;

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.logoutFunc = this.logoutFunc.bind(this);
    this.setAuthenticatedStatus = this.setAuthenticatedStatus.bind(this);
  }

  componentWillMount() {
    this.props.auth.handleAuth();
    Lock.on('authenticated', (authStatus)=> {
      console.log('auth status: ', authStatus);

      if (!authStatus.accessToken) {return};

      Lock.getUserInfo(authStatus.accessToken, (err, profile)=> {
        console.log('err',err, 'profile',profile);
        axios.post('http://localhost:5000/signup', profile)
          .then( (success)=>{
            console.log('user data', success);
            localStorage.setItem('email', profile.email);
            console.log(localStorage.getItem('email'), 'email');
            localStorage.setItem('authenticated', true);
            location.reload();
          })
          .catch((err)=>{
            console.log('error',err);
            localStorage.removeItem('authenticated');
          });
      });
    });

    Lock.on('authorization_error', (err)=>{
      console.log('auth error found: ', err);
    });
    console.log(localStorage.getItem('authenticated'));
    console.log(localStorage.getItem('email'));
  }

  componentDidMount() {
    this.setAuthenticatedStatus();
  }

  logoutFunc() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('email');
    this.props.auth.logout();
  }


  render() {

    const isLoggedIn = <h3><span id="logout" onClick={this.logoutFunc}>Logout</span> <span id="settings">Settings</span></h3>;
    const isNotLoggedIn = <h3 onClick={this.props.auth.login}>Login/SignUp</h3>;
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
  localStorage.getItem('authenticated') ? isLoggedIn : isNotLoggedIn
 }
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;
