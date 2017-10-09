import { cloneDeep, includes } from 'lodash'
import { 
  ADD_QUERY_ROW,
  UPDATE_CHOICE_ROW,
  RECEIVE_QUERY_SELECT_DATA,
  DELETE_QUERY_ROW,
  UPDATE_CONJUNCTION,
} from './actions.js'
import {
  parseIncomingSelectData,
  containsNull,
  isBooleanType
} from './utils'

const defaultChoiceRow = {choices:[''], max_n_choices: 3}
const defaultConjunction = 'and'
const defaultState = {
  choiceRows: [defaultChoiceRow],
  conjunctions: [],
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
  console.log(action)
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
  } else if (action.type === ADD_QUERY_ROW) {
    let { choiceRows, conjunctions } = state
    choiceRows = choiceRows.concat([defaultChoiceRow])
    conjunctions = conjunctions.concat([defaultConjunction])
    console.log(choiceRows)
    return { ...state, choiceRows, conjunctions}
  } else if (action.type === DELETE_QUERY_ROW) {
    let { rowIndex } = action
    let { choiceRows, conjunctions } = state
    if ((rowIndex === 0) && (choiceRows.length === 1)) {
      return {
        ...state,
        choiceRows: [defaultChoiceRow],
        conjunctions: [],
      }
    }
    return { ...state,
      choiceRows:[
        ...choiceRows.slice(0, rowIndex),
        ...choiceRows.slice(rowIndex + 1),
      ],
      conjunctions:[
        ...conjunctions.slice(0, rowIndex - 1),
        ...conjunctions.slice(rowIndex),
      ],
    }
  } else if (action.type === UPDATE_CONJUNCTION) {
    let { index, value } = action
    console.log(index, value)
    let { conjunctions } = state
    conjunctions = cloneDeep(conjunctions)
    conjunctions[index] = value
    return { ...state, conjunctions }
  } else {
    return state
  }
}

export default queryApp


