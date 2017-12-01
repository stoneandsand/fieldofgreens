import React from 'react';
import ItemEntry from './itemEntry.jsx';

const currentItemList = props => (
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
      key={singleItem.name}
    />))
  }
  </div>
  </div>
);

export default currentItemList;
