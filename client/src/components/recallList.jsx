import React from 'react';
import ItemEntry from './itemEntry.jsx';

const recallList = props => (
  <div className="card mb-4">
    <div>
      <h4 className="card-header">
        Recalls:
      </h4>
      <span className="new-list-name">{props.savedListName}
      </span>
    </div>
    <div className="card-body">
      {props.currentItems.map((singleItem, i) =>
    (<ItemEntry
         deleteItem={props.deleteItem}
         entry={singleItem}
         i={i}
         key={`recallList-${i}`}
    />))
  }
  </div>
  </div>
);

export default recallList;
