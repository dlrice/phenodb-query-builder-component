// @flow weak
import { connect } from 'react-redux'
import QuerySection from '../components/QuerySection'
import { updateQuery, fetchQuerySelectDataIfNeeded } from '../actions'
import { getQuerySelectDataKey } from '../utils'

const getSelectionOptions = (choiceRows, optionsCache) => {
  let t = choiceRows.map((choiceRow) => {
    return choiceRow.choices.map((choice, index) => {
      if (index === 0)
        return optionsCache['root']
      if (index === 3)
        return 'INPUT'
      let key = getQuerySelectDataKey(choiceRow.choices.slice(0, index))
      return optionsCache[key]
    })
  })
  return t
}

const mapStateToProps = state => {
  return {
    selectDataRows: getSelectionOptions(state.choiceRows, state.optionsCache),
    choiceRows: state.choiceRows,
  }
}

const mapDispatchToProps = dispatch => (
  {
    handleInput: (rowIndex, colIndex, choice) => {
      dispatch(updateQuery(rowIndex, colIndex, choice))
      dispatch(fetchQuerySelectDataIfNeeded(rowIndex, colIndex, choice))
    }
  }
)

const Query = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuerySection)

export default Query