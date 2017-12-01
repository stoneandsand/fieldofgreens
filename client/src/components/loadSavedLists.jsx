// Component to allow users to load saved shopping lists.

import React from 'react';

const loadSavedLists = props => (
  <div className="dropdown">
    <button className="btn btn-danger dropdown-toggle" type="button" id="savedLists" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    </button>
    <div className="dropdown-menu" aria-labelledby="savedLists">
      {props.savedLists.map((listEntry, i) => (
        <a className="dropdown-item" href="#" key={i} onClick={props.getSavedListItems.bind(null, listEntry)}>{listEntry}</a>
      ))}
  </div>
    </div>
);

export default loadSavedLists;
