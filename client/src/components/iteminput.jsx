import React from 'react';

let itemInput = ({newItemEntry, updateNewItemEntry, addNewItemToList, onKeyPress}) => (

  <div>

     <form id="add-item" onSubmit={addNewItemToList}>
      <label>
        <input class="item-input" type="text" placeholder="New Item" value={newItemEntry} onChange={updateNewItemEntry}/>
      </label>
      <input type="submit" class="btn btn-success" value="Add Item" />
    </form>

  </div>

  )

export default itemInput;