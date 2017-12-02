import React from 'react';

const currentListSaver = props => (
  <div>
    <form className="form-group" onSubmit={props.saveNewList}>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="List Name" value={props.inputListName} onChange={props.updateNewListName} />
        <span className="input-group-btn">
        <input type="submit" className="btn btn-success" value="Save List" />
      </span>
      </div>
    </form>
  </div>
);
export default currentListSaver;

