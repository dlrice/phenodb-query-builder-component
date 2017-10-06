// @flow weak

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Choice from './Choice'


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

const QueryRow = ({selectDataRow, choiceRow, handleSelection, classes}) => {
  console.log(selectDataRow)
  const choiceNodes = selectDataRow.map((selectData, colIndex) => (
    <Choice
      key={colIndex}
      options={selectData.options}
      chosen={choiceRow[colIndex]}
      title={selectData.title}
      handleSelection={(value) => handleSelection(colIndex, value)}
    />    
  ))

  return (
    <div className={classes.container}>
      {choiceNodes}
    </div>
  )
}

export default withStyles(styles)(QueryRow)