import React from 'react';

const shoppingListEntry = props => (
  <div onClick={props.onClick.bind(this, props.listEntry)}>
    {props.listEntry}
  </div>
);

export default shoppingListEntry;
