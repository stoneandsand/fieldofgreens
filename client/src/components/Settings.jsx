import React from 'react';
import StateDropdown from './StateDropdown.jsx';
import SettingsEntry from './SettingsEntry.jsx';

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
      goToSearchView,
      likes,
      location,
      newAllergy,
      newLike,
      newDislike,
      removeAllergy,
      removeLike,
      removeDislike,
      selectLocation,
      settingsView,
      updateNewAllergy,
      updateNewLike,
      updateNewDislike,
    } = this.props;
    return (
      settingsView &&
      <div className="container settingsView">
        <button type="button" className="btn btn-primary" onClick={goToSearchView}>To List Manager</button>
        <div className="card-deck location">
          <div className="card">
            <div className="card-body">
              <label>Location</label>
              <StateDropdown location={this.props.location} selectLocation={this.props.selectLocation} />
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form className="form-group" onSubmit={addAllergy}>
                <label>Allergies</label>
                <div className="input-group">
                  <input type="test" className="form-control" id="allergies" placeholder="peanuts" onChange={updateNewAllergy} value={newAllergy} />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-success" value="Add Item" />
                  </span>
                </div>
              </form>
              {
                  allergies.map((allergy, i) =>
                    <SettingsEntry removeEntry={removeAllergy} key={i} entry={allergy} />)
                }
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form className="form-group" onSubmit={addLike}>
                <label>Likes</label>
                <div className="input-group">
                  <input type="test" className="form-control" id="likes" placeholder="Kale" onChange={updateNewLike} value={newLike} />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-success" value="Add Item" />
                  </span>
                </div>
              </form>
              {
                  likes.map((like, i) =>
                    <SettingsEntry removeEntry={removeLike} key={i} entry={like} />)
                }
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <form className="form-group" onSubmit={addDislike}>
                <label>Dislikes</label>
                <div className="input-group">
                  <input type="test" className="form-control" id="dislikes" placeholder="Chicken" onChange={updateNewDislike} value={newDislike} />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-success" value="Add Item" />
                  </span>
                </div>
              </form>
              {
                  dislikes.map((dislike, i) =>
                    <SettingsEntry removeEntry={removeDislike} key={i} entry={dislike} />)
                }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
