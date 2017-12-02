import React from 'react';

const recallEntry = props => (
  <div className="recall-entry">
    <div>
      {props.recall ? `Product: ${props.recall.product_description}` : ''}
    </div>
    <br />
    <div>
      {props.recall ? `Reason For Recall:${props.recall.reason_for_recall}` : ''}
    </div>
  </div>
);

export default recallEntry;
