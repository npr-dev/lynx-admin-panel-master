import React, { useState } from 'react'
import './Filter.scss';
import { DropdownList } from 'react-widgets';

const Filter = props => {

  return (
    <div className="filter">
      <p className="title">{props.title}:</p>
      <DropdownList
        data={props.data}
        value={props.value}
        onChange={value => props.onChange(value)}
      />
    </div>
  )
}

export default Filter
