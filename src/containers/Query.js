// @flow weak
import { connect } from 'react-redux'
import QuerySection from '../components/QuerySection'
import { updateQuery } from '../actions'

const getSelectionOptions = (choiceRows, optionsCache) => {
  return choiceRows.map((choiceRow) => (
    choiceRow.map((choice) => {
      if (!choice)
        return optionsCache.root
      return optionsCache.root
    })
  ))
}

const mapStateToProps = state => {
  console.log(state)
  return {
    selectDataRows: getSelectionOptions(state.choiceRows, state.optionsCache),
    choiceRows: state.choiceRows,
  }
}

const mapDispatchToProps = dispatch => (
  {
    handleSelection: (rowIndex, colIndex, choice) => (
      dispatch(updateQuery(rowIndex, colIndex, choice))
    )
  }
)

const Query = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuerySection)

export default Query
