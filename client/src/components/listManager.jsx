// Component to load saved lists, display current items, and save current items into a new list.
// The saved lists dropdown should only show if a user is logged in.

import React from 'react';
import CurrentItems from './currentItems.jsx';
import LoadSavedLists from './loadSavedLists.jsx';
import SaveList from './saveList.jsx';

class ListManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newListName: '',
      savedLists: [],
    };
  }

  // makes get request to '/getSavedLists' API endpoint to retrieve names of saved lsits
  // list of lists renders on page
  getSavedLists() {
    axios.get(`/api/${username}/getSavedLists`)
      .then((data) => {
        this.setState({ savedLists: data.data });
      })
      .catch((error) => {
      });
  }

    // sets state savedListName to what was set in updateGroceryListName, also calls submitNewList
  saveNewListName(e) {
    e.preventDefault();
    this.props.submitNewList(this.newListName);
    this.setState({newListName: ''});
  }

  // sets state for newListName when user types in list name into input
  updateNewListName(e) {
    this.setState({ newListName: e.target.value });
  }

  
  render() {
    return (
      <div className="card mb-4">
        <br />
        <div className="savedList">
          <div>
            <h4 className="card-header">
              <b>List Manager</b>
            </h4>
          </div>
          <div className="card-body">
            {this.state.savedLists.length > 0 && <LoadSavedLists getSavedListItems={this.getSavedListItems} savedLists={this.state.savedLists}/>}
            {this.state.savedLists.length > 0 && <hr/>}
            <CurrentItems currentItems={this.props.currentItems}/>
            <SaveList newListName={this.newListName} updateNewListName={this.updateNewListName} saveNewListName={this.saveNewListName} />
          </div>
        </div>
      </div>
    );
  }
}

export default ListManager;
