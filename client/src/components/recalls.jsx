import React from 'react';

let recalls = ({recall}) => (

  <div>
    <div>{recall.reason_for_recall || recall}</div>
  </div>
  )

export default recalls;