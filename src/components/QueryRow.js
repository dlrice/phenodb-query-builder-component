// @flow weak
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Choice from './Choice'
import TextInput from './TextInput'
import Conjunction from './Conjunction'

const styles = theme => ({
  container: {
    backgroundColor: '#D5DBDB',
    borderWidth: 0.5,
    borderColor: 'white',
    borderStyle: 'solid',
    padding: 3,
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  deleteButton: {
    marginLeft: 'auto',
    margin: theme.spacing.unit,
  },
  conjunction: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const QueryRow = ({selectDataRow, choiceRow, handleInput, classes, handleDeleteClick, handleConjunction}) => {
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
    <div>
      <div className={classes.container}>
        {choiceNodes}
        <IconButton
          className={classes.deleteButton}
          onClick={()=> handleDeleteClick()}
          aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default withStyles(styles)(QueryRow)