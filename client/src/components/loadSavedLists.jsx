// Component to allow users to load saved shopping lists.

import React from 'react';

const loadSavedLists = props => (
  <div>
          {props.savedLists.map((listEntry, i) => (
        <p key={i} onClick={props.getSavedListItems.bind(null, listEntry)}>{listEntry}</p>
      ))}
  </div>
);

export default loadSavedLists;
