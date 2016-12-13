import React, { Component } from 'react'
import { MenuItem, SelectField } from 'material-ui'
import FilterSelect from './FilterSelect'

const FilterRow = ({depth, choice}) => {

  console.log('here')
  console.log(choice)
  console.log(depth)
  // handleChange = (event, index, value) => this.setState({value})
  // let filterSelectNodes
  // if (choice.size === 1)
  //   filterSelectNodes = <FilterSelect depth={depth} choice={'root'} key={0} />
  // else
  let filterSelectNodes = choice.map((c, i) => <FilterSelect depth={i} choice={c} key={i} />)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {filterSelectNodes}
    </div>
  )
}

export default FilterRow
