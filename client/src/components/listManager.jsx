import React from 'react';
import SaveList from './saveList.jsx';

const listManager = props => (
  <div className="card mb-4">
    <br />
    <div className="savedList">
      <div>
        <h4 className="card-header">
          <b>Saved Shopping Lists</b>
        </h4>
      </div>
    <div className="card-body">
      {props.savedLists.map((listEntry, i) => (
        <p key={i} onClick={props.getSavedListItems.bind(null, listEntry)}>{listEntry}</p>
      ))}
    <div>
    <SaveList inputListName={props.inputListName} updateGroceryListName={props.GroceryListName} saveGroceryListName={props.saveGroceryListName} />
    </div>
    </div>
  </div>
  </div>
);

export default listManager;
