// Component to load saved lists, display current items, and save current items into a new list.
// The saved lists dropdown should only show if a user is logged in.

import axios from 'axios';
import React from 'react';
import CurrentItems from './currentItems.jsx';
import SavedListsLoader from './savedListsLoader.jsx';
import SaveList from './saveList.jsx';

class ListManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newListName: '',
      savedLists: [],
    };
  }

  getSavedLists() {
    axios.get(`/api/${username}/getSavedLists`)
      .then((data) => {
        this.setState({ savedLists: data.data });
      })
      .catch((error) => {
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
        <br />
        <div className="savedList">
          <div>
            <h4 className="card-header">
              <b>List Manager</b>
            </h4>
          </div>
          <div className="card-body">
            {this.state.savedLists.length > 0 && <SavedListsLoader getSavedListItems={this.getSavedListItems} savedLists={this.state.savedLists}/>}
            {this.state.savedLists.length > 0 && <hr/>}
            <CurrentItems currentItems={this.props.currentItems}/>
            <SaveList newListName={this.newListName} updateNewListName={this.updateNewListName.bind(this)} saveNewList={this.saveNewList.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default ListManager;
