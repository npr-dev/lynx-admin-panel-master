import React from 'react';
import './Count.scss';

const Count = props => {
  return (
    <div className="count">
      Total: <span>{props.count}</span>
    </div>
  )
}

export default Count
