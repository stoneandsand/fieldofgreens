import React from 'react';
import ItemEntry from './itemEntry.jsx';

let currentItemList = (props) => (
<div>

  <div>Current Grossery List</div>

  <div>{props.currentItems.map((singleItem) =>
    <ItemEntry entry={singleItem.name} key={singleItem.name}/>)
  }</div>

  <button type='submit' onClick={props.searchfda}>Search FDA</button>

</div>
  )


export default currentItemList;