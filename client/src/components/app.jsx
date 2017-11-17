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
      currentItems: [
        {name: 'item1', recalls: [{recallDescripton: 'listeria'}]},
        {name: 'item2', recalls: [{recallDescripton: 'nuclear waste'}]}
      ],
      newItemEntry: '',
      inputListName: '',
      savedListName: '',
      savedListsfromDB: ['List1', 'List2']
    }
  }

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
    this.state.currentItems.push({name: this.state.newItemEntry});
    this.setState({currentItems: this.state.currentItems});
    console.log(' I got state', this.state.state)
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

      axios.get('/searchNewList', {params: {item: scope[i]}, state: this.state.state})
      .then(function(){
        console.log('list item was saved successfully');

        // assume return object: {
        //   name: 'item1',
        //   recalls: [
        //    {
        //         recallStates: ['bla'],
        //         recallDescription: 'bla'
        //       }
        //   ]
        // }

      });
    }
    console.log('list was saved successfully');
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

    axios.get('/getSavedLists')
    .then(function (data) {
      console.log(data);
      this.setState({savedListsfromDB: data.data});
    })
    .catch(function (error) {
      console.log(error);
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
        <ShoppingList savedLists={this.state.savedListsfromDB}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));