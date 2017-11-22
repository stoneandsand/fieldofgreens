import React from 'react';
import Recalls from './recalls.jsx';
import Bootstrap from '../../../bootstrap/css/bootstrap.css';

let itemEntry = ({entry, deleteItem, i}) => (

<div>
  <div className="list-item">{entry.name} <button type="button" className="btn btn-default" onClick={deleteItem.bind(this, i)}>
  <span className="glyphicon glyphicon-trash"></span>
  </button></div>

  <div>{entry.recalls === "" ? <Recalls recall={false}/> : entry.recalls.map((rec, i) => <Recalls key={i} recall={rec}/>)}
  </div>
</div>
  )

  export default itemEntry;