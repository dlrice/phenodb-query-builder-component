import React, { Component } from 'react'
import { MenuItem, SelectField } from 'material-ui'
import fetchSelectData from '../fetchSelectData'
// import './App.css'

// const items = [
//   <MenuItem key={1} value={1} primaryText="Center" />,
//   <MenuItem key={2} value={2} primaryText="Phenotypes" />,
//   <MenuItem key={3} value={3} primaryText="Individual" />,
//   <MenuItem key={4} value={4} primaryText="Weekends" />,
//   <MenuItem key={5} value={5} primaryText="Weekly" />,
// ]

const FilterSelect = ({depth, choice}) => {


  // handleChange = (event, index, value) => this.setState({value})

  console.log(choice)
  console.log(depth)

  const selectData = fetchSelectData(depth, choice)
  const choices = selectData.get('choices')
  const items = choices.map((k, v) => (
    <MenuItem key={k} value={k} primaryText={v} />
  )).toArray()
  
  return (
    <div>
      <SelectField
        // value={this.state.value}
        // onChange={this.handleChange}
        floatingLabelText={selectData.get('title')}
      >
        {items}
      </SelectField>
    </div>
  )

}

export default FilterSelect