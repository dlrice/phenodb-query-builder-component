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

const FilterSelect = ({selectIndex, previousChoice, handleSelect}) => {


  // handleChange = (event, index, value) => this.setState({value})

  console.log(previousChoice)
  console.log(selectIndex)

  const selectData = fetchSelectData(selectIndex, previousChoice)
  console.log(selectData)
  const choices = selectData.get('choices')
  const items = choices.map((k, v) => (
    <MenuItem key={k} value={k} primaryText={v} />
  )).toArray()
  
  return (
    <div>
      <SelectField
        // value={this.state.value}
        //onChange={(v) => handleSelect(v, selectIndex)}
        onChange={(e,v) => handleSelect(v)}
        floatingLabelText={selectData.get('title')}
      >
        {items}
      </SelectField>
    </div>
  )

}

export default FilterSelect