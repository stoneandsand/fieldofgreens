// Component to display items currently selected by the user.
// TODO: Refactor span logic (clean up).

import React from 'react';

const currentListItemsDisplay = props =>
      (
        <div>
          <p><b>Current Items: </b>
            {props.currentItems.map((item, i) => {
              return (
                <span key={`currentItems-${i}`}>{item.name}{props.currentItems.length <= 1 ? '.' : i < props.currentItems.length - 1 ? ', ' : '.'}</span>
              );
            })}
        </p>
          </div>
      );

export default currentListItemsDisplay;
