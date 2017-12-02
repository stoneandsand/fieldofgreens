import React from 'react';
import RecallListItem from './recallListItem.jsx';

const recallList = props => (
  <div className="card mb-4">
    <div>
      <h4 className="card-header">
        Recalls:
      </h4>
    </div>
    <div className="card-body">
      {props.currentItems.map((item, i) =>
    (<RecallListItem
         deleteItem={props.deleteItem}
         item={item}
         i={i}
         key={`recallListItem-${i}`}
    />))
  }
  </div>
  </div>
);

export default recallList;
