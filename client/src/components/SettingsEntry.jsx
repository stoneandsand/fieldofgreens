import React from 'react';

const SettingsEntry = props => (
  <div className="settingsEntry">
    <div>
      <button type="button" className="btn btn-danger" onClick={props.removeEntry.bind(null, props.entry)}>
        <i className="fa fa-remove fa-1x" aria-hidden="true" />
      </button>
      <span className="settings-item">{props.entry}</span>
    </div>
  </div>
);

export default SettingsEntry;
