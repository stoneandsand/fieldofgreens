import React from 'react';
import RecallListItem from './RecallListItem.jsx';

const RecallList = props => (
  props.currentItems.length > 0 &&
  <div className="row justify-content-md-center">
    <div className="col-1" />
    <div className="col-10">
      <div className="card mb-4">
        <div className="recallList">
          <h4 className="card-header">
            <b>Recalls</b>
          </h4>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {props.currentItems.map((item, i) =>
              (<li className="list-group-item" key={`recallListItem-${i}`}>
                <RecallListItem
                  deleteItem={props.deleteItem}
                  i={i}
                  item={item}
                />
              </li>))}
          </ul>
        </div>
      </div>
    </div>
    <div className="col-1" />
  </div>
);

export default RecallList;
