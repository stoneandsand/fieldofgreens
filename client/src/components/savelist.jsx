import React from 'react';

let saveList = (props) => (
<div>

    <form className="save-list" onSubmit={props.saveGrosseryListName}>
    <label>
      <input type="text" placeholder="New List Name" value={props.inputListName} onChange={props.updateGrosseryListName}/>
    </label>
    <input type="submit" class="btn btn-success" value="Save List"/>
  </form>

</div>
)
export default saveList;

