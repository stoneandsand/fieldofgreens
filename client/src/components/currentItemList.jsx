import React from 'react';
import ItemEntry from './itemEntry.jsx';

let currentItemList = (props) => (
<div>

  <div>Current Grossery List</div>

  <div>{props.listName}</div>
  <div>{props.currentItems.map((singleItem, i) =>
    <ItemEntry deleteItem={props.deleteItem} entry={singleItem.name} i={i} key={singleItem.name}/>)
  }</div>

  <button type='submit' onClick={props.searchfda}>Search FDA</button>

  <input type="text" value={props.listName} onChange={props.updateGrosseryListName} />
  <button type='submit' onClick={props.saveGrosseryListName}>Save List</button>

</div>
  )


export default currentItemList;