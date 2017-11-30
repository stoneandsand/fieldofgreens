import React from 'react';
import ItemInput from './iteminput.jsx';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  render() {
    const isLoggedIn = <h3><span id="logout">Logout</span> <span id="settings">Settings</span></h3>
    const isNotLoggedIn = <h3><span id="login">Login</span> or <span id="signup">Signup</span></h3>
    return (
      <div className="container-fluid navigation">
        <div className="row">
          <div className="col-md-4 loginOrOut">
            <h1>The Grossery List</h1>
          </div>
          <div className="col-md-4 search">
            <ItemInput />
          </div>
          <div className="col-md-4 signUpOrSettings">
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