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
              <label>Location</label>
              <StateDropdown />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Allergies</label>
                <input type="test" className="form-control" id="allergies" placeholder="peanuts" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Likes</label>
                <input type="test" className="form-control" id="likes" placeholder="Kale" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Dislikes</label>
                <input type="test" className="form-control" id="dislikes" placeholder="Chicken" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;