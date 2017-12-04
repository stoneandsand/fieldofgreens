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
      goToSearchView,
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
        <button type="button" className="btn btn-primary" onClick={goToSearchView}>To List Manager</button>
        <div className="card-deck location">
          <div className="card">
            <div className="card-body">
              <label>Location</label>
              <StateDropdown location={this.props.location} selectLocation={this.props.selectLocation}/>
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
              <form className="form-group" onSubmit={addLike}>
                <label>Likes</label>
                <div className="input-group">
                  <input type="test" className="form-control" id="likes" placeholder="Kale" onChange={updateNewLike} value={newLike} />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-success" value="Add Item" />
                  </span>
                </div>
              </form>
              <ol>
                {
                  likes ? likes.map((like, i) => {
                    return <li key={i}>{like}</li>
                  }) : null
                }
              </ol>
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
              <ol>
              {
                dislikes ? dislikes.map((dislike, i) => {
                  return <li key={i}>{dislike}</li>
                }) : null
              }
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
