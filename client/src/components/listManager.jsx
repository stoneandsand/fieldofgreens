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

    };
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
            {props.savedLists.length > 0 && <LoadSavedLists getSavedListItems={props.getSavedListItems} savedLists={props.savedLists}/>}
            {props.savedLists.length > 0 && <hr/>}
            <CurrentItems currentItems={props.currentItems}/>
            <SaveList inputListName={props.inputListName} updateGroceryListName={props.GroceryListName} saveGroceryListName={props.saveGroceryListName} />
          </div>
        </div>
      </div>
    );
  }
}

export default listManager;
