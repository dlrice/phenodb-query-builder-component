// @flow weak
import React from 'react'
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

const Choice = ({options, chosen='', title=null, handleSelection, classes}) => {
  
  const onChange = event => {
    handleSelection(event.target.value)
  }
  console.log(options)
  console.log(chosen)

  const items = options.map((c, i) => (
      <option value={c.value} key={i}>{c.name}</option>
  ))

  return (
    <FormControl className={classes.formControl}>
      { !!title ? <InputLabel htmlFor="age-native-simple">{title}</InputLabel> : null }
      <Select
        native
        value={chosen}
        onChange={onChange}
        input={<Input id="chice" />}
      >
        <option key="-1" value="" />
        {items}
      </Select>
    </FormControl>
  )
}

export default withStyles(styles)(Choice)