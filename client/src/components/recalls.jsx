import React from 'react';
import Bootstrap from '../../../bootstrap/css/bootstrap.css';
import Custom from '../../../bootstrap/css/custom.css';

const recalls = ({ recall }) => (
  <div className="recalls">
    <div>
      {recall ? `Product: ${recall.product_description}` : ''}
    </div>
    <br />
    <div>
      {recall ? `Reason For Recall:${recall.reason_for_recall}` : ''}
    </div>
  </div>
);

export default recalls;
