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
                <div className="input-group">
                  <input type="test" className="form-control" id="allergies" placeholder="peanuts" />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-success" value="Add Item" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Likes</label>
                <div className="input-group">
                  <input type="test" className="form-control" id="likes" placeholder="Kale" />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-success" value="Add Item" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Dislikes</label>
                <div className="input-group">
                  <input type="test" className="form-control" id="dislikes" placeholder="Chicken" />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-success" value="Add Item" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Settings;