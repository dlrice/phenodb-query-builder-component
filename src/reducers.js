import { cloneDeep } from 'lodash'
import { ADD_QUERY_ROW, UPDATE } from './actions.js'

const defaultState = {
  choiceRows: [['']],
  optionsCache: {
    root: {
      title: 'Filter on',
      options: [
        {
          pk: 0,
          value: 'phenotype',
          name: 'Phenotype',
        },
        {
          pk: 1,
          value: 'platform',
          name: 'Platform',
        },
        {
          pk: 2,
          value: 'study',
          name: 'Study',
        },
        {
          pk: 3,
          value: 'source',
          name: 'External Source',
        },
      ]
    },
  }
}

const queryApp = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE:
      let { rowIndex, colIndex, value } = action
      let choiceRows = cloneDeep(state.choiceRows)
      choiceRows[rowIndex][colIndex] = value
      return {...state, choiceRows}
    default:
      return state
  }
}

export default queryApp