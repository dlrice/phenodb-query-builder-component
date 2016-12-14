import React, { Component } from 'react'
import { MenuItem, SelectField } from 'material-ui'
import FilterSelect from './FilterSelect'

const FilterRow = ({choices, handleSelect, rowIndex}) => {

  console.log('here')
  console.log(choices)
  // handleChange = (event, index, value) => this.setState({value})
  let filterSelectNodes = choices.map((c, i) => {
      let previousChoice
      if (i > 0) {
        previousChoice = choices.get(i - 1)
      }
      return (
        <FilterSelect
          selectIndex={i}
          previousChoice={previousChoice}
          thisChoice={c}
          key={i}
          handleSelect={(v) => handleSelect(i, v)}
        />
      )
    }
  )

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {filterSelectNodes}
    </div>
  )
}

export default FilterRow
