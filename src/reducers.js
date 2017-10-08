import { cloneDeep, includes } from 'lodash'
import { ADD_QUERY_ROW, UPDATE_CHOICE_ROW, RECEIVE_QUERY_SELECT_DATA } from './actions.js'
import { parseIncomingSelectData, containsNull, isBooleanType } from './utils'

const defaultState = {
  choiceRows: [{choices:[''], max_n_choices: 3}],
  optionsCache: {
    root: {
      title: 'Filter on',
      options: [
        {
          value: 'phenotype',
          name: 'Phenotype',
        },
        {
          value: 'platform',
          name: 'Platform',
        },
        {
          value: 'study',
          name: 'Study',
        },
        {
          value: 'source',
          name: 'External Source',
        },
      ]
    },
  }
}

const queryApp = (state = defaultState, action) => {
  if (action.type === UPDATE_CHOICE_ROW) {
    let { rowIndex, colIndex, value } = action
    let { choiceRows, optionsCache } = state
    choiceRows = cloneDeep(choiceRows)
    let choiceRow = choiceRows[rowIndex]
    let {choices, max_n_choices} = choiceRow
    console.log(choiceRow)

    // Determine if this is a 4 input row
    // ie user provides text input
    if (colIndex === 3) {
      choices[colIndex] = value
      choiceRows[rowIndex] = {choices, max_n_choices}
      return {...state, choiceRows}
    }

    if ((choices.length === 3)
      && (choices[0] === 'phenotype')
      && (!containsNull(value))
      && (!isBooleanType(choices[1], optionsCache))) {
      console.log(isBooleanType(choices[1], optionsCache))
      console.log('here')
      max_n_choices = 4
    } else {
      max_n_choices = 3
      choices = choices.slice(0, 3)
    }
    if (choices.length <= max_n_choices) {
      choices = choices.slice(0, colIndex + 1)
      choices[colIndex] = value
      if ((choices.length != max_n_choices) && (choices[0] !== ''))
        choices[colIndex + 1] = ''
      choiceRows[rowIndex] = {choices, max_n_choices}
    }
    return {...state, choiceRows}
  } else if (action.type === RECEIVE_QUERY_SELECT_DATA) {
    let { key, incoming } = action
    let optionsCache = cloneDeep(state.optionsCache)
    incoming = parseIncomingSelectData(incoming, key)
    optionsCache[key] = incoming
    return { ...state, optionsCache}
  } else {
    return state
  }
}

export default queryApp


