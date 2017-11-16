import React from 'react';

let itemInput = ({newItemEntry, updateNewItemEntry, addNewItemToList}) => (

  <div>
    <input type="text" value={newItemEntry} onChange={updateNewItemEntry}/>

    <button id="addItem" onClick={addNewItemToList}>Add New Item</button>
  </div>

  )

export default itemInput;