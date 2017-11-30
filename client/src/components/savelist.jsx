import React from 'react';

const saveList = props => (
  <div>
    <form className="save-list" onSubmit={props.saveGrosseryListName}>
      <label>
        <input type="text" className="item-input" placeholder="New List Name" value={props.inputListName} onChange={props.updateGrosseryListName} />
      </label>
      <input type="submit" className="btn btn-success" value="Save List" />
    </form>
  </div>
);
export default saveList;

