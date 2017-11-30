import React from 'react';
import Recalls from './recalls.jsx';
import Bootstrap from '../../../bootstrap/css/bootstrap.css';

const itemEntry = ({ entry, deleteItem, i }) => (

  <div><button type="button" className="btn btn-default" onClick={deleteItem.bind(this, i)}>
    <span className="glyphicon glyphicon-remove" />
  </button>
    <span className="list-item">{entry.name} </span>

    <div>{entry.recalls === '' ? <Recalls recall={false} /> : entry.recalls.map((rec, i) => <Recalls key={i} recall={rec} />)}
    </div>
  </div>
);

export default itemEntry;
