// Component to load saved lists, display current items, and save current items into a new list.
// The saved lists dropdown should only show if a user is logged in.

import axios from 'axios';
import React from 'react';
import CurrentListItemsDisplay from './currentListItemsDisplay.jsx';
import CurrentListSaver from './currentListSaver.jsx';
import SavedListsLoader from './savedListsLoader.jsx';

class ListManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newListName: '',
      savedLists: ['test'], // FIX FIX FIX
      // savedLists: [], 
    };
  }

  getSavedLists() {
    axios.get(`/api/users/${username}/lists`)
      .then((data) => {
        this.setState({ savedLists: data.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  saveNewList(e) {
    e.preventDefault();
    let username = 'bob'; // FIX FIX FIX
    axios.post(`/api/users/${username}/lists`, {
      listName: this.state.newListName,
      items: this.props.currentItems,
    })
      .then((response) => {
        this.setState({newListName: ''});
        // this.props.getSavedLists();
      });
  }

  updateNewListName(e) {
    this.setState({ newListName: e.target.value });
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="listManager">
          <h4 className="card-header">
            <b>List Manager</b>
          </h4>
        </div>
        <div className="card-body">
          {this.state.savedLists.length > 0 && <SavedListsLoader getSavedListItems={this.props.getSavedListItems} savedLists={this.state.savedLists}/>}
          {this.state.savedLists.length > 0 && <hr/>}
          <CurrentListItemsDisplay currentItems={this.props.currentItems}/>
          <CurrentListSaver newListName={this.newListName} updateNewListName={this.updateNewListName.bind(this)} saveNewList={this.saveNewList.bind(this)} />
        </div>
      </div>
    );
  }
}

export default ListManager;
