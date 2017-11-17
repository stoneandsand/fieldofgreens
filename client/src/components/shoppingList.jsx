import React from 'react';
import ShoppingListEntry from './shoppingListEntry.jsx';

let shoppingList = (props) => (
	<div>

		<div>shoppinglist</div>
		<div>
			{props.savedLists.map(listEntry => (
				<ShoppingListEntry listEntry={listEntry}/>
			))}
		</div>
	</div>
  )

export default shoppingList;