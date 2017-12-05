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
    this.removeAllergy = this.removeAllergy.bind(this);
    this.removeLike = this.removeLike.bind(this);
    this.removeDislike = this.removeDislike.bind(this);
    this.resetNewAllergy = this.resetNewAllergy.bind(this);
    this.resetNewLike = this.resetNewLike.bind(this);
    this.resetNewDislike = this.resetNewDislike.bind(this);
    this.selectLocation = this.selectLocation.bind(this);
    this.updateNewItemEntry = this.updateNewItemEntry.bind(this);
    this.updateNewAllergy = this.updateNewAllergy.bind(this);
    this.updateNewLike = this.updateNewLike.bind(this);
    this.updateNewDislike = this.updateNewDislike.bind(this);
    this.getSavedLists = this.getSavedLists.bind(this);
  }

  // Makes get request to get saved shopping lists when component mounts
  componentWillMount() {
    this.setState({ username: localStorage.getItem('email') });
  }

  componentDidMount() {
    if (this.state.username) {
      this.getSavedLists();
      this.getSettings();
    }
  }

  addNewItemToList(e) {
    e.preventDefault();
    this.setState({ newItemEntry: '' }, this.searchNewItem(this.state.newItemEntry));
    this.setState({ settingsView: false });
  }

  getSavedLists() {
    const username = this.state.username;
    if (username) {
      axios.get(`/api/users/${username}/lists`)
        .then((res) => {
          this.setState({ savedLists: res.data });
        })
        .catch((err) => {
          console.error(err);
          alert(`We're very sorry, ${username}. There was an fetching your saved lists.`);
        });
    }
  }

  // Updates currentItems with contents of selected saved list.
  getSavedListItems(listId) {
    const savedListItems = [];
    const username = this.state.username;
    const id = listId;

    axios.get(`/api/users/${username}/lists/${id}`)
      .then((res) => {
        const mapped = res.data.items.map((item) => {
          savedListItems.push({ name: item, recalls: [] });
        });
        this.setState({ currentItems: savedListItems }, this.searchAllItems);
      }).catch((err) => {
        console.error(err);
        alert(`We're very sorry, ${username}. There was an error fetching your list.`);
      });
  }

  selectLocation(e) {
    const location = e.target.name.toUpperCase();
    this.setState({ location });
  }

  updateNewItemEntry(e) {
    this.setState({ newItemEntry: e.target.value });
  }

  updateNewAllergy(e) {
    this.setState({ newAllergy: e.target.value });
  }

  updateNewLike(e) {
    this.setState({ newLike: e.target.value });
  }

  updateNewDislike(e) {
    this.setState({ newDislike: e.target.value });
  }

  deleteItem(index, e) {
    const currentItems = this.state.currentItems;
    currentItems.splice(index, 1);
    this.setState({ currentItems });
  }

  getSettings() {
    const username = this.state.username;
    axios.get(`api/users/${username}/settings`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          allergies: res.data.allergies,
          likes: res.data.likes,
          dislikes: res.data.dislikes,
          location: res.data.location,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Called when user loads saved list
  searchAllItems() {
    const currentItems = this.state.currentItems;
    this.setState({
      currentItems: [],
    });
    const location = this.state.location;
    for (const item of currentItems) {
      this.searchNewItem(item.name);
    }
  }

  searchNewItem(item) {
    // MUST HAVE DEFAULT OR SEARCH WILL FAIL
    if (!this.state.location) { this.state.location = 'CA'; }
    axios.get(`/api/search/${this.state.location}/${item}`)
      .then((res) => {
        const currentItems = this.state.currentItems;
        const newItem = { name: item, recalls: res.data };
        currentItems.unshift(newItem);
        this.setState({ currentItems });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addAllergy(event) {
    event.preventDefault();
    console.log({ item: this.state.newAllergy, user: this.state.username });
    axios.post(`/api/users/${this.state.username}/allergies`, { item: this.state.newAllergy, user: this.state.username })
      .then((res) => {
        this.setState({
          allergies: res.data,
        });
        this.resetNewAllergy();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addLike(event) {
    event.preventDefault();
    axios.post(`/api/users/${this.state.username}/likes`, { item: this.state.newLike, user: this.state.username })
      .then((res) => {
        this.setState({
          likes: res.data,
        });
        this.resetNewLike();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addDislike(event) {
    event.preventDefault();
    axios.post(`/api/users/${this.state.username}/dislikes`, { item: this.state.newDislike, user: this.state.username })
      .then((res) => {
        this.setState({
          dislikes: res.data,
        });
        this.resetNewDislike();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addLocation() {
    axios.post(`/api/users/${username}/location`, this.state.location)
      .then((res) => {
        this.setState({
          location: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  goToSettingsView() {
    this.setState({ settingsView: true });
  }

  goToSearchView() {
    this.setState({ settingsView: false });
  }

  resetNewAllergy() {
    this.setState({ newAllergy: '' });
  }

  resetNewLike() {
    this.setState({ newLike: '' });
  }

  resetNewDislike() {
    this.setState({ newDislike: '' });
  }

  removeAllergy(allergy) {
    const username = this.state.username;
    const body = { type: 'allergies', name: allergy };
    axios.post(`/api/users/${username}/delete`, body)
      .then((res) => {
        this.setState({
          allergies: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  removeLike(like) {
    const username = this.state.username;
    const body = { type: 'likes', name: like };
    axios.post(`/api/users/${username}/delete`, body)
      .then((res) => {
        this.setState({
          likes: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  removeDislike(dislike) {
    const username = this.state.username;
    const body = { type: 'dislikes', name: dislike };
    axios.post(`/api/users/${username}/delete`, body)
      .then((res) => {
        this.setState({
          dislikes: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
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
      removeAllergy,
      removeLike,
      removeDislike,
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
          removeAllergy={this.removeAllergy}
          removeLike={this.removeLike}
          removeDislike={this.removeDislike}
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
