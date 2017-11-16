import React from 'react';
import ReactDOM from 'react-dom';
import StateDropdown from 'stateDropdown.jsx';

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
        <StateDropdown />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));