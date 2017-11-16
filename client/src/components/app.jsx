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
      currentItems: [{name: 'item1'}, {name: 'item2'}],
      newItemEntry: '',
      listName: ''
    }
  }

  updateNewItemEntry(event) {
    this.setState({newItemEntry: event.target.value})
  }

  addNewItemToList(e) {
    e.preventDefault();
    this.state.currentItems.push({name: this.state.newItemEntry});
    this.setState({currentItems: this.state.currentItems});
  }

  deleteItem(index, e) {
    console.log(index)
    this.state.currentItems.splice(index, 1);
    this.setState({currentItems: this.state.currentItems});
  }

  searchFDA() {
    console.log('searchFDA was called');
    let scope = this.state.currentItems;
    for (var i = 0; i < this.state.currentItems.length; i++) {
      axios.get('/searchNewList', {params: {item: scope[i]}})
      .then(function(){
        console.log('list item was saved successfully');
      });
    }
    console.log('list was saved successfully');
  }

  updateGrosseryListName(e) {
    this.setState({listName: e.target.value});
  }

  saveGrosseryListName(e) {
    e.preventDefault();
    this.setState({listName: this.state.listName});
  }

  render() {
    return (
      <div>
        <StateDropdown/>
        <ItemInput updateNewItemEntry={this.updateNewItemEntry.bind(this)} newItemEntry={this.state.newitemEntry} addNewItemToList={this.addNewItemToList.bind(this)}/>
        <CurrentItemList deleteItem={this.deleteItem.bind(this)} listName={this.state.listName} searchfda={this.searchFDA.bind(this)} currentItems={this.state.currentItems} updateGrosseryListName={this.updateGrosseryListName.bind(this)} saveGrosseryListName={this.saveGrosseryListName.bind(this)} listName={this.state.listName}/>
        <ShoppingList/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));