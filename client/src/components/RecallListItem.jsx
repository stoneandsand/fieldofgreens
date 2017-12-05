import React from 'react';
import RecallEntry from './RecallEntry.jsx';

const RecallListItem = props => (
  <div>
    <div>
      <button type="button" className="btn btn-danger" onClick={props.deleteItem.bind(null, props.i)}>
        <i className="fa fa-remove fa-2x" aria-hidden="true" />
      </button>
      <span className="list-item"><big>{props.item.name}</big></span>
      <div>
        {props.item.recalls.length === 0 ? <RecallEntry recall={false} /> : props.item.recalls.map((recall, i) =>
          <RecallEntry key={`recallEntry-${i}`} last={i === props.item.recalls.length - 1}recall={recall} />)}
      </div>
    </div>
  </div>
);

export default RecallListItem;
