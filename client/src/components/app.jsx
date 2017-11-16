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
      newitemEntry: '',
      listName: ''
    }
  }

  addNewItem(event) {
    this.setState({newitemEntry: event.target.value})
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

  render() {
    return (
      <div>
        <StateDropdown/>
        <ItemInput addNewItem={this.addNewItem.bind(this)} newitemEntry={this.state.newitemEntry}/>
        <CurrentItemList searchfda={this.searchFDA.bind(this)} currentItems={this.state.currentItems}/>
        <ShoppingList/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));