import React from 'react';
import ItemEntry from './itemEntry.jsx';

let currentItemList = (props) => (
<div>
  <div>
    <span className="new-list-header">
      Current Grossery List!!!:
    </span>
    <span className="new-list-name">{props.savedListName || "list not saved"}
    </span>
  </div>
  <div>{props.currentItems.map((singleItem, i) =>
    <ItemEntry
      deleteItem={props.deleteItem}
      entry={singleItem}
      i={i}
      key={singleItem.name}
    />)
  }</div>
</div>
  )

export default currentItemList;