import React from 'react';

let itemInput = ({newItemEntry, updateNewItemEntry, addNewItemToList, onKeyPress}) => (

  <div>

     <form id="add-item" onSubmit={addNewItemToList}>
      <label>
        <input type="text" placeholder="Add New Item Here " value={newItemEntry} onChange={updateNewItemEntry}/>
      </label>
      <input type="submit" class="btn btn-success" value="Add Item" />
    </form>

  </div>

  )

export default itemInput;