import React from 'react';
import Recalls from './recalls.jsx';

let itemEntry = ({entry}) => (
<div>
  <div>{entry}</div>
  <div>
    <Recalls />
  </div>
</div>
  )

  export default itemEntry;