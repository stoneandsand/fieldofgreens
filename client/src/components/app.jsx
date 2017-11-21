import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import StateDropdown from './stateDropdown.jsx';
import ItemInput from './iteminput.jsx';
import CurrentItemList from './currentItemList.jsx';
import ShoppingList from './shoppingList.jsx';

 class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      state: 'AL',
      currentItems: [],
      newItemEntry: '',
      inputListName: '',
      savedListName: '',
      savedListsfromDB: ['List1', 'List2']
    }
  }

  //makes get request to
  componentDidMount() {
    console.log('loaded!')
    this.getSavedLists();
  }

  selectState(e) {
    this.setState({state: e.target.value});
    console.log('testing')
  }

  updateNewItemEntry(event) {
    this.setState({newItemEntry: event.target.value});
  }

  addNewItemToList(e) {
    e.preventDefault();
    this.state.currentItems.push({name: this.state.newItemEntry, recalls: ""});
    this.setState({currentItems: this.state.currentItems}, this.searchFDA);
  }

  deleteItem(index, e) {
    console.log(index)
    this.state.currentItems.splice(index, 1);
    this.setState({currentItems: this.state.currentItems});
  }

  searchFDA() {
    let scope = this.state.currentItems;
    let app = this;
    let newCurrentItems = [];
    let promises = [];
    for (var i = 0; i < this.state.currentItems.length; i++) {
      promises.push(axios.get('/searchNewList', {params: {item: scope[i]}, state: this.state.state}));
    }
    axios.all(promises).then(function(recallData){
      recallData.forEach(function(response) {
        let item = response.data[0];
        let value = response.data;
        let obj = {
          recalls: value,
          name: item
        };
        response.data.shift();
        newCurrentItems.push(obj);
        console.log('state to set', newCurrentItems);
        app.setState({currentItems: newCurrentItems}, console.log('updated state', app.state));
      });
    });
  }

  updateGrosseryListName(e) {
    this.setState({inputListName: e.target.value});
  }

  saveGrosseryListName(e) {
    e.preventDefault();
    this.setState({savedListName: this.state.inputListName}, this.submitNewList);
  }

  submitNewList() {
     axios.post('/saveList', {
        listName: this.state.savedListName,
        items: this.state.currentItems
      })
      .then(function (response) {
        console.log(response);
        console.log('list was saved');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getSavedLists() {
    console.log('saved list');
    let app = this;
    axios.get('/getSavedLists')
    .then(function (data) {
      app.setState({savedListsfromDB: data.data});
    })
    .catch(function (error) {
    });
  }

  getSavedListItems(listName){
    console.log('getsavedlistitems has been called in shoppinglistentry');
    let app = this;
    let newItems = [];
    axios.get('/getList', {params: {name: listName}})
    .then(function(response){
      let mapped = response.data[0].items.map(item => {
      newItems.push({name: item, recalls: ""});
      })
      app.setState({currentItems: newItems}, app.searchFDA);
    });
  }



  render() {
    return (
      <div>
        <StateDropdown selectstate={this.selectState.bind(this)}/>
        <ItemInput updateNewItemEntry={this.updateNewItemEntry.bind(this)}
          newItemEntry={this.state.newitemEntry}
          addNewItemToList={this.addNewItemToList.bind(this)}/>
        <CurrentItemList
          deleteItem={this.deleteItem.bind(this)}
          searchfda={this.searchFDA.bind(this)}
          currentItems={this.state.currentItems}
          updateGrosseryListName={this.updateGrosseryListName.bind(this)}
          saveGrosseryListName={this.saveGrosseryListName.bind(this)}
          savedListName={this.state.savedListName}
          inputListName={this.state.inputListName} />
        <ShoppingList savedLists={this.state.savedListsfromDB} getSavedItems={this.getSavedListItems.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));