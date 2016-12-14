import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { List, fromJS } from 'immutable'
import FilterRow from './FilterRow'

// import './App.css'


class FiltersSection extends Component {

  constructor(props) {
    let initialRows = List()
    let initialSelect = List([0])
    initialRows = initialRows.push(initialSelect)
    super(props)
    this.state = {chosen: initialRows}
  }


  onAddClicked() {
    console.log('add')
  }


  handleSelect(rowIndex, selectIndex, v) {
    console.log(rowIndex, selectIndex, v)
  }

  render() {
    const style = this.getStyles()
    const chosen = this.state.chosen
    console.log(chosen.toJS())
    let filterNodes = chosen.map((c, i) => (
      <FilterRow
        choices={c}
        key={i}
        rowIndex={i}
        handleSelect={(selectIndex, v) => this.handleSelect(selectIndex, i, v)}
      />
    ))
    return (
      <Card style={style.card}>
        <CardHeader
          title='FILTERS'
          titleColor="grey"
          style={style.header}
        />
        <CardText expandable={false}>
          {filterNodes}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <FloatingActionButton 
              mini={true}
              onClick={() => this.onAddClicked()}
            >
              <ContentAdd />
            </FloatingActionButton>
            <Paper zDepth={1}  style={{padding: 10, backgroundColor:'lightgrey', marginLeft: 5}}>
                Add rules to filter individuals from PhenoDB
            </Paper>
          </div>
        </CardText>
      </Card>
    )
  }

  getStyles() {
    return {
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
  }
}

export default FiltersSection
