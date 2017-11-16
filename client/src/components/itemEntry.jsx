import React from 'react';
import Recalls from './recalls.jsx';

let itemEntry = ({entry, deleteItem, i}) => (




<div>
    <div>{entry.name}</div>
    <button onClick={deleteItem.bind(this, i)} >delete</button>
    <div></div>
</div>
  )

  export default itemEntry;