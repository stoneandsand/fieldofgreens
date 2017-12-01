// Component to display items currently selected by the user.

import React from 'react';

const currentItems = props =>
      (
        <div>
          <p><b>Current Items:</b></p>
          {props.currentItems.map((item, i) => {
            (
              <span key={`currentItems-${i}`}>{item} </span>
            )})}
        </div>
      );

export default currentItems;
