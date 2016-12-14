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

const FilterSelect = ({selectIndex, previousChoice, thisChoice, handleSelect}) => {


  // handleChange = (event, index, value) => this.setState({value})

  console.log(selectIndex)
  console.log(previousChoice)
  

  const selectData = fetchSelectData(selectIndex, previousChoice)
  const choices = selectData.get('choices')
  const items = choices.map((c) => {
    return (
      <MenuItem
        key={c.get('pk')}
        value={c.get('pk')}
        primaryText={c.get('name')}
      />
    )
  })
  
  console.log('thisChoice', thisChoice)
  return (
    <div style={{paddingRight: 10}}>
      <SelectField
        style={{width: 200}}
        value={thisChoice > -1 ? thisChoice : undefined}
        onChange={(e,v) => handleSelect(v)}
        floatingLabelText={selectData.get('title')}
      >
        {items}
      </SelectField>
    </div>
  )

}

export default FilterSelect