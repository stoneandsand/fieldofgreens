import React from 'react';

const saveList = props => (
  <div>
    <form className="save-list" onSubmit={props.saveGroceryListName}>
      <label>
        <input type="text" className="item-input" placeholder="List Name" value={props.inputListName} onChange={props.updateGroceryListName} />
      </label>
      <input type="submit" className="btn btn-success" value="Save List" />
    </form>
  </div>
);
export default saveList;

