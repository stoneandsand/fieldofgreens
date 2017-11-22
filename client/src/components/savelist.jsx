import React from 'react';

let saveList = (props) => (
<div>

    <form className="save-list" onSubmit={props.saveGrosseryListName}>
    <label>
      <input type="text" placeholder="Add List Name Here" value={props.inputListName} onChange={props.updateGrosseryListName}/>
    </label>
    <input type="submit" value="Save List"/>
  </form>

</div>
)
export default saveList;

