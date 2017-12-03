import React from 'react';
import ListManager from './ListManager.jsx';
import RecallList from './RecallList.jsx';

const SearchView = props => (
  !props.settingsView &&
  <div className="container">
    <ListManager
      currentItems={props.currentItems}
      getSavedListItems={props.getSavedListItems}
    />
    <RecallList
      deleteItem={props.deleteItem}
      currentItems={props.currentItems}
    />
  </div>
);

export default SearchView;
