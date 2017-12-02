import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import StateDropdown from './stateDropdown.jsx';
import ItemInput from './iteminput.jsx';
import RecallList from './recallList.jsx';
import ListManager from './listManager.jsx';
import Navigation from './navigation.jsx';
import Auth from './../../../Auth/Auth.js';
import Settings from './settings.jsx';

const auth = new Auth();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      currentItems: [{name: 'apple', recalls:[]}, {name: 'banana', recalls:[]}],
      currentItems: [],
      newItemEntry: '',
      isLoggedIn: false,
      settingsView: false,
    };
    this.updateNewItemEntry = this.updateNewItemEntry.bind(this);
    this.addNewItemToList = this.addNewItemToList.bind(this);
    this.selectState = this.selectState.bind(this);
  }

  // makes get request to get saved shopping lists when component mounts
  componentDidMount() {
    // should only run if user logged in
    // this.getSavedLists();
    this.searchNewItem();
  }

  // Updates currentItems with contents of selected saved list.
  getSavedListItems(listName) {
    const newItems = [];
    axios.get(`/api/${username}/${list}`, { params: { name: listName } })
      .then((response) => {
        const mapped = response.data[0].items.map((item) => {
          newItems.push({ name: item, recalls: [] });
        });
        this.setState({ currentItems: newItems }, this.searchFDA);
      });
  }

  // sets state for state(location) when item selected in dropdown
  selectState(e) {
    this.setState({ state: e.target.value });
  }

  // sets state for newItemEntry when user inputs item name
  updateNewItemEntry(e) {
    this.setState({ newItemEntry: e.target.value });
  }

  // adds new item to current list when "Add New Item" is clicked
  addNewItemToList(e) {
    e.preventDefault();
    this.state.currentItems.unshift({ name: this.state.newItemEntry, recalls: [] });
    this.setState({ newItemEntry: '' });
    console.log(this.state.currentItems);
    // this.setState({ currentItems: updatedCurrentItems }, this.searchFDA);
    this.setState({ currentItems: this.state.currentItems }, this.searchFDA);
  }

  // deletes item from list when "delete" is clicked next to item
  deleteItem(index, e) {
    this.state.currentItems.splice(index, 1);
    this.setState({ currentItems: this.state.currentItems });
  }

  searchNewItem(item) {
    // let newItem = {name: this.state.newItemEntry, recalls: []}
    // let newItem = {name: 'bananas', recalls: []};
    console.log('SEARCHING');
    axios.get(`/api/search/${item}`)
      .then((res) => {
        // Should send back an array of objects (recalls);
        console.log(res.data);
        let currentItems = this.state.currentItems;
        let newItem = {name: item, recalls: res.data};
        currentItems.unshift(newItem);
        this.setState({currentItems: currentItems});
      })
      .catch((err) => {
        console.error(err);
      });
    // axios.get('/api/users/abc/lists')
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  // called when new items are added to the list, whether by user input or retreival of existent list from database
  // makes get request for each item to '/searchNewList' API endpoint
  searchFDA() {
    const scope = this.state.currentItems;
    const newCurrentItems = [];
    const promises = [];
    for (let i = 0; i < this.state.currentItems.length; i++) {
      promises.push(axios.get('/api/search', { item: scope[i], state: this.state.state }));
    }
    axios.all(promises).then((recallData) => {
      recallData.forEach((response) => {
        const item = response.data[0];
        const value = response.data;
        const obj = {
          recalls: value,
          name: item,
        };
        response.data.shift();
        newCurrentItems.push(obj);
        this.setState({ currentItems: newCurrentItems });
      });
    });
  }

  render() {
    var settingsView = (
      <div className="container settingsView">
        <Settings />
      </div>
    );
    var searchView = (
      <div>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-auto mt-4">
              <ListManager currentItems={this.state.currentItems} getSavedListItems={this.getSavedListItems.bind(this)} />
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-auto">
            {this.state.currentItems.length > 0 && <RecallList deleteItem={this.deleteItem.bind(this)} currentItems={this.state.currentItems} />}
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <Navigation addNewItemToList={this.addNewItemToList} isLoggedIn={this.state.isLoggedIn} location={this.state.state} newItemEntry={this.state.newItemEntry} selectState={this.selectState} updateNewItemEntry={this.updateNewItemEntry} auth={auth} />
        {
          this.state.settingsView ? settingsView : searchView
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
