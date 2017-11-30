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
        <p key={i} onClick={props.getSavedListItems.bind(null, listEntry)}>{listEntry}</p>
      ))}
    </div>
  </div>
  </div>
);

export default shoppingList;
