/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Grid from 'material-ui/Grid';
import { CircularProgress } from 'material-ui/Progress'


import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

const styles = theme => ({
  card: {
    maxWidth: 600,
    backgroundColor: '#D5DBDB'
  },
  media: {
    height: 194,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  title: {
    fontSize: 18,
    paddingTop: 12,
    paddingLeft: 10,
  },
 root: {
    flexGrow: 1,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

});

class OutputCard extends React.Component {

  state = { expanded: false, selectAll: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  handleChange = value => (event, checked) => {
    this.props.handleCheckboxClick(value, checked)
  }

  handleSelectAll = () => (event, checked) => {
    console.log('asdkfhaksjdfhkajsdflh')
    this.setState({ selectAll: checked })
    this.props.handleSelectAll(checked)
  }
  

  componentDidMount() {
    this.props.fetchOutputOptionDataIfNeeded()
  }

  render() {
    
    if (!this.props.checkboxData)
      return (<CircularProgress />)

    console.log(this.props)

    const checkboxes = this.props.checkboxData.map(({value, text, selected}, index) => (
      <FormControlLabel
        key={index}
        label={text}
        control={
          <Checkbox
            checked={selected}
            onChange={this.handleChange(value)}
            value={value}
          />
        }
      />
    ))

    const classes = this.props.classes;

    return (
      <div>
        <Card elevation={0} className={classes.card}>
          <div className={classes.root}>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography type="subheading" className={classes.title}>
                  {this.props.title}
                </Typography>
              </Grid>
              <Grid item xs>
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.selectAll}
                        onChange={this.handleSelectAll()}
                        value="selectAll"
                        />
                      }
                    label="Select all"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Grid>
            </Grid>
          </div>
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              <FormControl component="fieldset">
                <FormGroup>
                  {checkboxes}
                </FormGroup>
              </FormControl>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

OutputCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutputCard);