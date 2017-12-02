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
            </div>
          </div>
        </div>
        <div className="card-deck allergies">
          <div className="card">
            <div className="card-body">
            </div>
          </div>
        </div>
        <div className="card-deck likes">
          <div className="card">
            <div className="card-body">
            </div>
          </div>
        </div>
        <div className="card-deck dislikes">
          <div className="card">
            <div className="card-body">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;