// Component to display items currently selected by the user.
// TODO: Refactor span logic (clean up).

import React from 'react';

const CurrentListItemsDisplay = props =>
      (
        <div>
          <p><b>Current Items: </b>
            {props.currentItems.map((item, i) => {
              return (
                <span key={`currentItems-${i}`}  >
                <span className="text-danger" onClick={props.deleteItem.bind(null, props.i)}>[x]
                </span>{' '}
      {item.name}{props.currentItems.length <= 1 ? ' ' : i < props.currentItems.length - 1 ? ', ' : ' '}</span>
              );
            })}
        </p>
          </div>
      );

export default CurrentListItemsDisplay;
