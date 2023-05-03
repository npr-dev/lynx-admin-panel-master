import React from 'react'
import { FormGroup, Label, Input } from 'reactstrap'

const Search = props => {
  return (
    <div>
      <FormGroup style={{ marginBottom: 0 }}>
        <Input type="search" name="search" id="search"
          placeholder={props.placeholder} 
          value={props.value}
          onChange={(e) => props.onChange(e)}
          />
      </FormGroup>
    </div>
  )
}

export default Search
