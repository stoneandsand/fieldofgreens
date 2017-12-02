import React from 'react';
import StateDropdown from './stateDropdown.jsx';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container settingsView">
        <button type="button" className="btn btn-primary">Search</button>
        <div className="card-deck location">
          <div className="card">
            <div className="card-body">
              <h3>Location</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3>Allergies</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3>Likes</h3>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3>Dislikes</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;