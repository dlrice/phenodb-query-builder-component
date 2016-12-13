import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';


// import './App.css'


const Section = (props) => {

  const style = {
    header: {
      backgroundColor: 'lightgrey',
      fontWeight: 'bold',
      padding: 7.5,
    },
    cardAction: {
      textAlign: 'left',
    },
    card: {
      marginTop: 15,
    },
  }

  return (
    <Card style={style.card}>
      <CardHeader
        title={props.title}
        titleColor="grey"
        style={style.header}

      />
      <CardText expandable={false}>
        {props.children}
      </CardText>
      <CardActions style={style.cardAction}>
        <FloatingActionButton 
          mini={true}
          onClick={() => props.onEditClicked()}
        >
          <ModeEdit />
        </FloatingActionButton>
      </CardActions>
    </Card>
  )
}

export default Section
