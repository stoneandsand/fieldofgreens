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
      inputListName: '',
      savedListName: '',
      savedLists: [],
    };
  }

  // sets state for inputListName when user types in list name into input
  updateGroceryListName(e) {
    this.setState({ inputListName: e.target.value });
  }

  // sets state savedListName to what was set in updateGroceryListName, also calls submitNewList
  saveGroceryListName(e) {
    e.preventDefault();
    this.setState({ savedListName: this.state.inputListName }, this.submitNewList);
    this.state.inputListName = '';
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
            <SaveList inputListName={this.inputListName} updateGroceryListName={this.GroceryListName} saveGroceryListName={this.saveGroceryListName} />
          </div>
        </div>
      </div>
    );
  }
}

export default ListManager;
