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

  saveNewListName(e) {
    e.preventDefault();
    this.props.submitNewList(this.newListName);
    this.setState({newListName: ''});
  }

  updateNewListName(e) {
    this.setState({ newListName: e.target.value });
  }

  // called when "Save List" is clicked with a list name
  // makes post request to '/saveList' API endpoint and saves list name & items to database
  // calls getSavedList to get latest list of lists from database to render newest list
  submitNewList(listName) {
    let username = 'bob';
    axios.post(`/api/users/${username}/lists`, {
      listName: listName,
      items: this.state.currentItems,
    })
      .then((response) => {
        console.log(response);
        console.log('list was saved');
        this.getSavedLists();
      });
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
            <SaveList newListName={this.newListName} updateNewListName={this.updateNewListName} saveNewListName={this.saveNewListName} />
          </div>
        </div>
      </div>
    );
  }
}

export default ListManager;
