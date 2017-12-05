import React from 'react';

const ItemInput = props => (
  <div>
    <form className="form-group" onSubmit={props.addNewItemToList}>
      <div className="input-group">
        <input className="form-control" type="text" placeholder="New Item" value={props.newItemEntry} onChange={props.updateNewItemEntry} />
        <span className="input-group-btn">
          <input type="submit" className="btn btn-success" value="Add Item" />
        </span>
      </div>
    </form>
  </div>
);

export default ItemInput;
