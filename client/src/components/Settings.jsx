import React from 'react';
import StateDropdown from './StateDropdown.jsx';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      addAllergy,
      addDislike,
      addLike,
      allergies,
      dislikes,
      likes,
      location,
      newAllergy,
      newLike,
      newDislike,
      selectLocation,
      settingsView,
      updateNewAllergy,
      updateNewLike,
      updateNewDislike,
    } = this.props;
    return (
      settingsView &&
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
              <form className="form-group" onSubmit={addAllergy}>
                <label>Allergies</label>
                <div className="input-group">
                  <input type="test" className="form-control" id="allergies" placeholder="peanuts" onChange={updateNewAllergy} />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-success" value="Add Item" />
                  </span>
                </div>
              </form>
              <ol>
                {
                  allergies ? allergies.map((allergy, i) => {
                    return <li key={i}>{allergy}</li>
                  }) : null
                }
              </ol>
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
    );
  }
}

export default Settings;
