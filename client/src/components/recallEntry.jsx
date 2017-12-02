import React from 'react';

const recallEntry = props => {
  if (props.recall) {
    return (
      <div className="recall-entry">
        <h5>
          Product:
        </h5>
        <p>
         {props.recall.product_description}
        </p>
        <h5>
          Reason for recall:
          </h5>
        <p>
          {props.recall.reason_for_recall}
        </p>
        <hr/>
      </div>
    );
  } else {
    return null;
  }
};

export default recallEntry;
