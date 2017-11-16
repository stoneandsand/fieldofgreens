import React from 'react';

let itemInput = ({input, addNewItem}) => (

  <div>
    <form onSubmit={addNewItem}>
      <label>
        Add Image url:
        <input type="text" value={input} onChange={addNewItem}/>
      </label>
      <input type="submit" value="Submit"/>
    </form>
  </div>

  )

export default itemInput;