import React from 'react';
import StateDropdown from './stateDropdown.jsx';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container settingsView">
        <StateDropdown />
      </div>
    )
  }
}

export default Settings;