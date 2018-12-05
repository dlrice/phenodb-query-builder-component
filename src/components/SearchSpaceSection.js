// @flow weak

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';



const styles = theme => ({
  root: {
    display: 'flex',
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

const SearchSpaceSection = ({handleSubsetClick, searchSpace, classes}) => {
  
  const handleChange = (event, value) => {
    handleSubsetClick(value)
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" required className={classes.formControl}>
        <RadioGroup
          aria-label="setSelection"
          name="setSelection"
          className={classes.group}
          value={searchSpace.name}
          onChange={handleChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="All records" />
          <FormControlLabel value="subset" control={<Radio />} label="User defined list" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default withStyles(styles)(SearchSpaceSection)