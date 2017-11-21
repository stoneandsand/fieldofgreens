import React from 'react';

let recalls = ({recall}) => (

  <div>
    <div>
      {recall ? 'Product: ' + recall.product_description : ""}
    </div>
    <div>
      {recall ? 'Reason For Recall:' + recall.reason_for_recall : ""}
    </div>
  </div>
  )

export default recalls;