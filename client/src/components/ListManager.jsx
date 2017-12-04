// Component to load saved lists, display current items, and save current items into a new list.
// The saved lists dropdown should only show if a user is logged in.

import axios from 'axios';
import React from 'react';
import CurrentListItemsDisplay from './CurrentListItemsDisplay.jsx';
import CurrentListSaver from './CurrentListSaver.jsx';
import SavedListsLoader from './SavedListsLoader.jsx';

class ListManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newListName: '',
      savedLists: [], // FIX FIX FIX
      // savedLists: [],
    };
    this.getSavedLists = this.getSavedLists.bind(this);
  }

  componentWillMount() {
    if (this.props.username) {
      this.getSavedLists();
    }
  }

  getSavedLists() {
    axios.get(`/api/users/${this.props.username}/lists`)
      .then(res => {
        this.setState({ savedLists: res.data });
      })
      .catch(err => {
        console.error(err);
        // alert(`We're very sorry, ${username}. There was an fetching your saved lists.`);
      });
  }

  saveNewList(e) {
    e.preventDefault();

    let username = this.props.username; // FIX FIX FIX
    if (!username) {
      // TODO: Use a better notification system than alerts
      alert('Please sign up or log in to gain access to saved list functionality.');
      return;
    }
    axios.post(`/api/users/${username}/lists`, {
      listName: this.state.newListName,
      items: this.props.currentItems,
    })
      .then(res => {
        this.setState({newListName: ''});
        this.setState({savedLists: res.data});
        // this.props.getSavedLists();
      }).catch(err => {
        console.error(err);
        // alert(`We're very sorry, ${username}. There was an error saving your list.`);
      });
  }

  updateNewListName(e) {
    this.setState({ newListName: e.target.value });
  }

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-1">
        </div>
        <div className="col-10">
          <div className="card mt-4 mb-4">
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
        </div>
        <div className="col-1">
        </div>
      </div>
    );
  }
}

export default ListManager;
