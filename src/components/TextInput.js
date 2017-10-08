// @flow weak
import React from 'react'
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField'


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const TextInput = ({options, value='', handleInput, classes}) => {
  
  const onChange = event => {
    handleInput(event.target.value)
  }

  return (
    <FormControl className={classes.formControl}>
      <TextField
        id="name"
        value={value}
        onChange={onChange}
        margin="normal"
      />
    </FormControl>
  )
}

export default withStyles(styles)(TextInput)