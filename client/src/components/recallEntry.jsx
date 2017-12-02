import React from 'react';

const RecallEntry = props => {
  if (props.recall) {
    return (
      <div className="recall-entry">
        <h5>
          <i>
            Product
          </i>
        </h5>
        <p>
          {props.recall.product_description}
        </p>
        <h5>
          <i>
            Reason for Recall
          </i>
        </h5>
        <p>
          {props.recall.reason_for_recall}
        </p>
        {!props.last && <hr/>}
      </div>
    );
  } else {
    return null;
  }
};

export default RecallEntry;
