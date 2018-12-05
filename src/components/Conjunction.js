// @flow weak
import React from 'react'
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  button: {
    // padding: 0,
    // marginTop: 10,
    // marginBottom: 4,
    margin: theme.spacing.unit,
  },
});

const Conjunction = ({value, handleClick, classes}) => {
  
  return (
    <div>
      <Button raised={value === 'and'} dense className={classes.button} onClick={() => handleClick('and')}>
        And
      </Button>
      <Button raised={value === 'or'} dense className={classes.button} onClick={() => handleClick('or')}>
        Or
      </Button>
    </div>
  )
}

export default withStyles(styles)(Conjunction)