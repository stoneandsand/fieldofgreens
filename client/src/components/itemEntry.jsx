import React from 'react';
import Recalls from './recalls.jsx';

let itemEntry = ({entry, deleteItem, i}) => (

<div>
  <div>{entry.name}</div>
  <button onClick={deleteItem.bind(this, i)} >delete</button>
  <div>
    <Recalls recall={entry.recalls ? entry.recalls[0].recallDescription : ""}/>
  </div>
</div>
  )

  export default itemEntry;