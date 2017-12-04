import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Auth from './../../../Auth/Auth.js';
import ItemInput from './ItemInput.jsx';
import ListManager from './ListManager.jsx';
import Navigation from './Navigation.jsx';
import RecallList from './RecallList.jsx';
import SearchView from './SearchView.jsx';
import Settings from './Settings.jsx';
import StateDropdown from './StateDropdown.jsx';

const auth = new Auth();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      allergies: [],
      likes: [],
      dislikes: [],
      currentItems: [],
      newItemEntry: '',
      newAllergy: '',
      newLike: '',
      newDislike: '',
      settingsView: false,
      username: '',
    };
    this.addAllergy = this.addAllergy.bind(this);
    this.addDislike = this.addDislike.bind(this);
    this.addLike = this.addLike.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.addNewItemToList = this.addNewItemToList.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.getSavedListItems = this.getSavedListItems.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.goToSearchView = this.goToSearchView.bind(this);
    this.goToSettingsView = this.goToSettingsView.bind(this);
    this.resetNewAllergy = this.resetNewAllergy.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.updateNewItemEntry = this.updateNewItemEntry.bind(this);
    this.updateNewAllergy = this.updateNewAllergy.bind(this);
    this.updateNewLike = this.updateNewLike.bind(this);
    this.updateNewDislike = this.updateNewDislike.bind(this);
  }

  // Makes get request to get saved shopping lists when component mounts
  componentDidMount() {
    // if (this.state.isLoggedIn || true) { this.searchNewItem(); }
    // FIX FIX FIX
    this.setState({username: localStorage.getItem('email')});
    console.log(localStorage.getItem('email'), 'email called on app.jsx')
    this.getSettings();
  }

  addNewItemToList(e) {
    e.preventDefault();
    this.setState({ newItemEntry: '' }, this.searchNewItem(this.state.newItemEntry));
  }

  // Updates currentItems with contents of selected saved list.
  getSavedListItems(listId) {
    const savedListItems = [];
    let username = this.state.username || 'j.tang17@gmail.com';
    console.log(listId);
    let id = listId;

    axios.get(`/api/users/${username}/lists/${id}`)
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
    let location = e.target.name.toUpperCase();
    this.setState({ location: location });
  }

  // sets state for newItemEntry when user inputs item name
  updateNewItemEntry(e) {
    this.setState({ newItemEntry: e.target.value });
  }

  // sets state for newAllergy when user inputs item name
  updateNewAllergy(e) {
    this.setState({ newAllergy: e.target.value });
  }

  // sets state for newLike when user inputs item name
  updateNewLike(e) {
    this.setState({ newLike: e.target.value });
  }

  // sets state for newDislike when user inputs item name
  updateNewDislike(e) {
    this.setState({ newDislike: e.target.value });
  }

  // deletes item from list when "delete" is clicked next to item
  deleteItem(index, e) {
    let currentItems = this.state.currentItems;
    currentItems.splice(index, 1);
    this.setState({ currentItems: currentItems });
  }

  getSettings() {
    let username = this.state.username || 'j.tang17@gmail.com';
    axios.get(`api/users/${username}/settings`)
      .then(res => {
        console.log(res.data);
        this.setState({
          allergies: res.data.allergies,
          likes: res.data.likes,
          dislikes: res.data.dislikes,
          location: res.data.location,
        });
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
    console.log({item: this.state.newAllergy, user: this.state.username});
    axios.post(`/api/users/${this.state.username}/allergies`, {item: this.state.newAllergy, user: this.state.username})
      .then(res => {
        this.setState({
          allergies: res.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  addLike(event) {
    event.preventDefault();
    axios.post(`/api/users/${this.state.username}/likes`, {item: this.state.newLike, user: this.state.username})
      .then(res => {
        this.setState({
          likes: res.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  addDislike(event) {
    event.preventDefault();
    axios.post(`/api/users/${this.state.username}/dislikes`, {item: this.state.newDislike, user:this.state.username})
      .then(res => {
        this.setState({
          dislikes: res.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  addLocation() {
    axios.post(`/api/users/${username}/location`, this.state.location)
      .then(res => {
        this.setState({
          location: res.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  goToSettingsView() {
    this.setState({settingsView: true});
  }

  goToSearchView() {
    this.setState({settingsView: false});
  }

  resetNewAllergy() {
    this.setState({newAllergy: ''});
  }

  render() {
    const {
      allergies,
      currentItems,
      dislikes,
      likes,
      location,
      newAllergy,
      newDislike,
      newItemEntry,
      newLike,
      settingsView,
      username,
    } = this.state;
    return (
      <div>
        <Navigation
          addNewItemToList={this.addNewItemToList}
          auth={auth}
          location={location}
          newItemEntry={newItemEntry}
          selectLocation={this.selectLocation}
          updateNewItemEntry={this.updateNewItemEntry}
          username={username}
          goToSettingsView={this.goToSettingsView}
        />
        <Settings
          addAllergy={this.addAllergy}
          addDislike={this.addDislike}
          addLike={this.addLike}
          allergies={allergies}
          dislikes={dislikes}
          likes={likes}
          location={location}
          newAllergy={newAllergy}
          newLike={newLike}
          newDislike={newDislike}
          selectLocation={this.selectLocation}
          settingsView={settingsView}
          updateNewAllergy={this.updateNewAllergy}
          updateNewLike={this.updateNewLike}
          updateNewDislike={this.updateNewDislike}
          goToSearchView={this.goToSearchView}
          resetNewAllergy={this.resetNewAllergy}
        />
        <SearchView
          currentItems={currentItems}
          username={username}
          deleteItem={this.deleteItem}
          getSavedListItems={this.getSavedListItems}
          settingsView={settingsView}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
