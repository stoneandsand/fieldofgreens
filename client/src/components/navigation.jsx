import React from 'react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  render() {
    return (
      <div className="container-fluid navigation">
        <div className="row">
          <div className="col-md-4 loginOrOut">
          </div>
          <div className="col-md-4 search">
          </div>
          <div className="col-md-4 signUpOrSettings">
          </div>
        </div>
      </div>
    );
  }
}

export default Navigation;