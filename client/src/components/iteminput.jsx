import React from 'react';

const itemInput = ({newItemEntry, updateNewItemEntry, addNewItemToList, }) => (
  <div>
    <form className="form-group" onSubmit={addNewItemToList}>
      <div className="input-group">
      <input className="form-control" type="text" placeholder="New Item" value={newItemEntry} onChange={updateNewItemEntry} />
      <span className="input-group-btn">
        <input type="submit" className="btn btn-success" value="Add Item" />
      </span>
      </div>
    </form>
  </div>
);

export default itemInput;
