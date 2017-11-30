import React from 'react';
import ShoppingListEntry from './shoppingListEntry.jsx';

const shoppingList = props => (
  <div>
    <br />
    <div className="savedList">
      <div>
        <h4>
          <b>Saved Shopping Lists</b>
        </h4>
      </div>
    <div>
      {props.savedLists.map((listEntry, i) => (
        <ShoppingListEntry key={i} listEntry={listEntry} onClick={props.getSavedItems} />
      ))}
    </div>
  </div>
  </div>
);

export default shoppingList;
