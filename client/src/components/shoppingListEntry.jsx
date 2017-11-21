import React from 'react';

let shoppingListEntry = (props) => (
  <div onClick={props.onClick.bind(this,props.listEntry)}>
    {props.listEntry}
  </div>
)

export default shoppingListEntry;