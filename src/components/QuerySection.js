// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import QueryRow from './QueryRow'


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 3,
    backgroundColor: 'lightgrey',
  }),
});

const QuerySection = ({choiceRows, selectDataRows, handleSelection}) => {
  const queryRows = choiceRows.map((choiceRow, rowIndex) => (
    <QueryRow 
      key={rowIndex}
      selectDataRow={selectDataRows[rowIndex]}
      choiceRow={choiceRow}
      handleSelection={(colIndex, choice) => handleSelection(rowIndex, colIndex, choice)}
    />
  ))

  return (
    <div>
      <Paper elevation={4}>
        {queryRows}
      </Paper>
    </div>
  )
}


export default withStyles(styles)(QuerySection);