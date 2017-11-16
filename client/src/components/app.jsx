import React from 'react';
import ReactDOM from 'react-dom';
import StateDropdown from './stateDropdown.jsx';
import ItemInput from './iteminput.jsx';
import CurrentItemList from './currentItemList.jsx';
import ShoppingList from './shoppingList.jsx';

 class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      test: true
    }
  }

  render() {
    return (
      <div>
        <StateDropdown/>
        <ItemInput/>
        <CurrentItemList/>
        <ShoppingList/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));