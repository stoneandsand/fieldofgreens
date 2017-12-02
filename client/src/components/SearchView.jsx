import React from 'react';
import ListManager from './ListManager.jsx';
import RecallList from './RecallList.jsx';

const searchView = props => (
  <div className="container">
    <ListManager
      currentItems={this.props.currentItems}
      getSavedListItems={this.props.getSavedListItems} // BIND IN APP
    />
    <RecallList
      deleteItem={this.deleteItem.bind(this)}
      currentItems={this.props.currentItems}
    />
  </div>
);


