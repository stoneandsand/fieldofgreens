// Component to allow users to load saved shopping lists.

import React from 'react';

const loadSavedLists = props => (
  <div>
    <div className="dropdown mb-2">
      <button className="btn btn-warning btn-block dropdown-toggle text-center" type="button" id="savedLists" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Load a saved list
      </button>
      <div className="dropdown-menu" aria-labelledby="savedLists">
        {props.savedLists.map((listEntry, i) => (
          <a className="dropdown-item" href="#" key={i} onClick={props.getSavedListItems.bind(null, listEntry)}>{listEntry}</a>
        ))}
  </div>
    </div>
    </div>
);

export default loadSavedLists;
