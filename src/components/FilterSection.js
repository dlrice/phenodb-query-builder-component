import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { List, fromJS } from 'immutable'
import FilterRow from './FilterRow'

// import './App.css'


class FilterSection extends Component {

  constructor(props) {
    let initialRows = List()
    let initialSelect = List([-1])
    initialRows = initialRows.push(initialSelect)
    super(props)
    this.state = {chosen: initialRows}
  }


  onAddClicked() {
    console.log('add')
  }


  handleSelect(selectIndex, rowIndex, v) {
    console.log(rowIndex, selectIndex, v)
    let chosen = this.state.chosen
    let row = chosen.get(rowIndex)
    if (selectIndex === row.size - 1) {
      row = row.push(-1)
    } else {
      row = row.slice(0, selectIndex + 1)
      row = row.push(-1)
    }
    row = row.set(selectIndex, v)
    chosen = chosen.set(rowIndex, row)
    this.setState({chosen})
    console.log('chosen.toJS()')
    console.log(chosen.toJS())
  }

  render() {
    const style = this.getStyles()
    const chosen = this.state.chosen
    console.log(chosen.toJS())
    let filterRowNodes = chosen.map((c, i) => (
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
          {filterRowNodes}
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

export default FilterSection
