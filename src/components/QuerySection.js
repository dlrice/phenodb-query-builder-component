// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import QueryRow from './QueryRow'
import Conjunction from './Conjunction'


const styles = theme => ({
  conjunction: {
    backgroundColor: 'white',
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap',
  },
  addButton: {
    marginTop: 5,
  },
  // conjunction: {
  //   padding: 0,
  //   margin: 0,
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
});

const QuerySection = ({choiceRows, selectDataRows, handleInput, classes, handleAddClick, handleDeleteClick, handleConjunction, conjunctions}) => {
  const queryRows = choiceRows.map((choiceRow, rowIndex) => (
    <div key={rowIndex}>
      {
        rowIndex === 0 ? '' : 
        (<Conjunction value={conjunctions[rowIndex - 1]} handleClick={(value) => handleConjunction(rowIndex - 1, value)}/>)
      }
      <QueryRow
        selectDataRow={selectDataRows[rowIndex]}
        choiceRow={choiceRow}
        handleInput={(colIndex, choice) => handleInput(rowIndex, colIndex, choice)}
        handleDeleteClick={() => handleDeleteClick(rowIndex)}
      />
    </div>
  ))

  return (
    <div>
      {queryRows}
      <Button
        className={classes.addButton}
        aria-label="add"
        onClick={() => handleAddClick()}
      >
        <AddIcon />
      </Button>
    </div>
  )
}


export default withStyles(styles)(QuerySection);