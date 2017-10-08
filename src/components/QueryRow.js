// @flow weak
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import Choice from './Choice'
import TextInput from './TextInput'




const styles = theme => ({
  container: {
    backgroundColor: '#D5DBDB',
    borderWidth: 0.5,
    borderColor: 'black',
    borderStyle: 'solid',
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const QueryRow = ({selectDataRow, choiceRow, handleInput, classes}) => {
  console.log(selectDataRow)
  let {choices, max_n_choices} = choiceRow
  const choiceNodes = selectDataRow.map((selectData, colIndex) => {
    console.log(colIndex)
    if (colIndex === 3) {
      return (
        <TextInput
          key={colIndex}
          value={choices[colIndex]}
          handleInput={(value) => handleInput(colIndex, value)}
        />
      )
    } else if (!selectData) {
      return (
        <CircularProgress key={colIndex} />
      )
    } else {
      return (
        <Choice
          key={colIndex}
          options={selectData.options}
          chosen={choices[colIndex]}
          title={selectData.title}
          handleInput={(value) => handleInput(colIndex, value)}
        />
      )
    }
  })

  return (
    <div className={classes.container}>
      {choiceNodes}
    </div>
  )
}

export default withStyles(styles)(QueryRow)