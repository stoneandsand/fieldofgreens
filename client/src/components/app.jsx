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
      location: '',
      allergies: [],
      likes: [],
      dislikes: [],
      currentItems: [{name: 'apple', recalls:[]}, {name: 'banana', recalls:[]}],
      newItemEntry: '',
      isLoggedIn: false,
      settingsView: false,
      username: '',
    };
    this.updateNewItemEntry = this.updateNewItemEntry.bind(this);
    this.addNewItemToList = this.addNewItemToList.bind(this);
    this.getSavedLists = this.getSavedLists.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.addAllergy = this.addAllergy.bind(this);
    this.addLike = this.addLike.bind(this);
    this.addDislike = this.addDislike.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  // Makes get request to get saved shopping lists when component mounts
  componentDidMount() {
    this.getSavedLists();
    this.searchAllItems();
    this.getSettings();
    // if (this.state.isLoggedIn || true) { this.searchNewItem(); }
    // FIX FIX FIX
  }

  //  TO BE  REPLACED BY SEARCHNEWITEM
  // adds new item to current list when "Add New Item" is clicked
  addNewItemToList(e) {
    e.preventDefault();
    this.setState({ newItemEntry: '' }, this.searchNewItem(this.state.newItemEntry));
  }

  getSavedLists() {
    let username = this.state.username || 'abc';
    axios.get(`/api/users/${username}/lists`)
      .then(res => {
        console.log(res.data); //user's lists
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Updates currentItems with contents of selected saved list.
  getSavedListItems(listName) {
    const savedListItems = [];
    let username = this.state.username || 'abc';
    let list = {
      id: '123',
      name: 'test',
    }
    // list = this.state.selectedList;
    axios.get(`/api/users/${username}/lists/${list.id}`)
      .then(res => {
        console.log(res.data);
        const mapped = res.data.items.map((item) => {
          savedListItems.push({ name: item, recalls: [] });
        });
        console.log(mapped);
        this.setState({ currentItems: savedListItems }, this.searchAllItems);
      }).catch(err => {
        console.error(err);
        alert(`We're very sorry, ${username}. There was an error fetching your list.`);
      });
  }

  // sets state for state(location) when item selected in dropdown
  selectLocation(e) {
    this.setState({ location: e.target.value });
  }

  // sets state for newItemEntry when user inputs item name
  updateNewItemEntry(e) {
    this.setState({ newItemEntry: e.target.value });
  }

  // deletes item from list when "delete" is clicked next to item
  deleteItem(index, e) {
    let currentItems = this.state.currentItems;
    currentItems.splice(index, 1);
    this.setState({ currentItems: currentItems });
  }

  getSettings() {
    let username = this.state.username || 'abc';
    axios.get(`api/users/${username}/settings`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  // called when new items are added to the list, whether by user input or retreival of existent list from database
  // makes get request for each item to '/searchNewList' API endpoint
  searchAllItems() {
    let currentItems = this.state.currentItems;
    this.setState({
      currentItems: [],
    });
    let location = this.state.location || 'CA';
    for (let item of currentItems) {
      this.searchNewItem(item.name);
    }
  };

  searchNewItem(item) {
    // DEFAULTS FOR TESTING
    if (!this.state.location) { this.state.location = 'CA'; } // FIX FIX FIX
    if (!item) { item = 'kiwi'; } // FIX FIX FIX
    axios.get(`/api/search/${this.state.location}/${item}`)
      .then(res => {
        // Should send back an array of objects (recalls);
        console.log('RESPONSE FROM SEARCH-NEW-ITEM:');
        console.log(res.data);
        let currentItems = this.state.currentItems;
        let newItem = {name: item, recalls: res.data}; // EXAMPLE: {name: 'bananas', recalls: []};
        currentItems.unshift(newItem);
        this.setState({currentItems: currentItems});
      })
      .catch(err => {
        console.error(err);
        // alert(`We're very sorry. There was an error searching for your item.`); FIX FIX FIX
      });
  }

  addAllergy(event) {
    event.preventDefault();
    axios.post(`/api/users/${username}/allergies`, {item: event.target.value})
      .then(res => {
        this.setState({
          allergies: res.data,
        })
      })
      .catch(err => {
        console.error(err);
      });
    const joined = this.state.allergies.push(event.target.value);
    this.setState({allergies: joined});
  }

  addLike(event) {
    event.preventDefault();
    axios.post(`/api/users/${username}/likes`, {item: event.target.value})
      .then(res => {
        this.setState({
          likes: res.data,
        })
      })
      .catch(err => {
        console.error(err);
      });
    const joined = this.state.likes.push(event.target.value);
    this.setState({likes: joined});
  }

  addDislike(event) {
    event.preventDefault();
    axios.post(`/api/users/${username}/dislikes`, {item: event.target.value})
      .then(res => {
        this.setState({
          dislikes: res.data,
        })
      })
      .catch(err => {
        console.error(err);
      });
    const joined = this.state.dislikes.push(event.target.value);
    this.setState({dislikes: joined});
  }

  addLocation() {
    axios.post(`/api/users/${username}/location`, this.state.location)
      .then(res => {
        this.setState({
          location: res.data,
        })
      })
      .catch(err => {
        console.error(err);
      });

  toggleLogin(boolean) {
    this.setState({isLoggedIn: boolean})
  }

  render() {
    var settingsView = (
      <Settings settingsView={this.state.settingsView} location={this.state.location} allergies={this.state.allergies} likes={this.state.likes} dislikes={this.state.dislikes} selectLocation={this.selectLocation} addAllergy={this.addAllergy} addLike={this.addLike} addDislike={this.addDislike}/>
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
        <Navigation addNewItemToList={this.addNewItemToList} toggleLogin={this.toggleLogin} location={this.state.state} newItemEntry={this.state.newItemEntry} selectLocation={this.selectLocation} updateNewItemEntry={this.updateNewItemEntry} auth={auth} />
        {
          this.state.settingsView ? settingsView : searchView
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
