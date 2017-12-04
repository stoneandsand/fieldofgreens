import React from 'react';

const SettingsEntry = props => {
  return (
    <div>
      <div>
        <button type="button" className="btn btn-danger" onClick={props.removeEntry.bind(props.entry)}>
          <i className="fa fa-remove fa-1x" aria-hidden="true"></i>
        </button>
        <span className="settings-item">{props.settings.name}</span>
      </div>
    </div>
  );
};

export default SettingsEntry;
