import React from 'react';

const SettingsEntry = props => {
  let click;
  if (props.like) {
    click = props.removeLike.bind(props.like);
  } else if (props.dislike) {
    click = props.removeDislike.bind(props.dislike);
  } else if (props.allergy) {
    click = props.removeAllergy.bind(props.allergy);
  }
  return (
    <div>
      <div>
        <button type="button" className="btn btn-danger" onClick={click}>
          <i className="fa fa-remove fa-1x" aria-hidden="true"></i>
        </button>
        <span className="settings-item">{props.settings.name}</span>
      </div>
    </div>
  );
};

export default SettingsEntry;
