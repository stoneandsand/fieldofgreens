import React from 'react';
import ItemInput from './iteminput.jsx';
import StateDropdown from './stateDropdown.jsx';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  render() {
    const isLoggedIn = <h3><span id="logout">Logout</span> <span id="settings">Settings</span></h3>
    const isNotLoggedIn = <h3>Login/SignUp</h3>
    return (
      <div className="container-fluid navigation">
        <div className="row top">
          <div className="col-md-4 loginOrOut">
            <h1>The Grossery List</h1>
          </div>
          <div className="col-md-4 search">
            <ItemInput />
          </div>
          <div className="col-md-4 signUpOrSettings">
            <StateDropdown />
            {
              this.state.isLoggedIn ? isLoggedIn : isNotLoggedIn
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;