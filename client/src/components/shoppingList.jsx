import React from 'react';
import ShoppingListEntry from './shoppingListEntry.jsx';

let shoppingList = (props) => (
	<div>

		<div>shoppinglist</div>
		<div>
			{props.savedLists.map((listEntry, i) => (
				<ShoppingListEntry key={i} listEntry={listEntry} onClick={props.getSavedItems}/>
			))}
		</div>
	</div>
  )

export default shoppingList;