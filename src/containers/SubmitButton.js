// @flow weak
import React from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button';
import { submit } from '../actions'



let SubmitButton = ({ dispatch }) => {

  return (
    <Button
      raised
      color="primary"
      onClick={() => dispatch(submit())}
    >
      Submit
    </Button>
  )
}

SubmitButton = connect()(SubmitButton)

export default SubmitButton