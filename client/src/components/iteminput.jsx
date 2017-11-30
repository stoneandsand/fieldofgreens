import React from 'react';

const itemInput = ({newItemEntry, updateNewItemEntry, addNewItemToList, onKeyPress,}) => (
  <div>
    <form id="add-item" onSubmit={addNewItemToList}>
      <label>
        <input className="item-input" type="text" placeholder="New Item" value={newItemEntry} onChange={updateNewItemEntry} />
      </label>
      <input type="submit" className="btn btn-success" value="Add Item" />
    </form>
  </div>
);

export default itemInput;
