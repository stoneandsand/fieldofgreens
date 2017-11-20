import React from 'react';
import Recalls from './recalls.jsx';

let itemEntry = ({entry, deleteItem, i}) => (

<div>{console.log('entry:', entry)}
  <div>{entry.name}</div>
  <button onClick={deleteItem.bind(this, i)} >delete</button>
  <div>{entry.recalls === "" ? <Recalls recall={""}/> : entry.recalls.map((rec, i) => <Recalls key={i} recall={rec}/>)}
  </div>
</div>
  )

  export default itemEntry;