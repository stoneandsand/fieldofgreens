import React from 'react';
import RecallListItem from './recallListItem.jsx';

const recallList = props => (
  <div className="card mb-4">
    <div className="recallList">
      <h4 className="card-header">
        <b>Recalls</b>
      </h4>
    </div>
    <div className="card-body">
      {props.currentItems.map((item, i) =>
                              <div key={`recallListItem-${i}`}>
                                  <RecallListItem deleteItem={props.deleteItem} item={item} i={i} />
                                    {i < props.currentItems.length - 1 && <hr/>}
                                </div>
                             )}
  </div>
    </div>
);

export default recallList;
