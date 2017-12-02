import React from 'react';
import RecallEntry from './recallEntry.jsx';

const recallListItem = props => (
  <div>
    <button type="button" className="btn btn-default" onClick={props.deleteItem.bind(null, props.i)}>
    <span className="glyphicon glyphicon-remove" />
  </button>
    <span className="list-item">{props.item.name}</span>
    <div>
        {props.item.recalls.length === 0 ? <RecallEntry recall={false} /> : props.item.recalls.map((recall, i) => <RecallEntry key={`recallEntry-${i}`} recall={recall} />)}
    </div>
  </div>
);

export default recallListItem;
