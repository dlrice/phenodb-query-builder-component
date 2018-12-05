import 'whatwg-fetch'
import {getQuerySelectDataKey, getQuerySelectDataParts} from './utils'

export const ADD_QUERY_ROW = 'ADD_QUERY_ROW'
export const UPDATE_CHOICE_ROW = 'UPDATE_CHOICE_ROW'
export const RECEIVE_QUERY_SELECT_DATA = 'RECEIVE_QUERY_SELECT_DATA'
export const REQUEST_QUERY_SELECT_DATA = 'REQUEST_QUERY_SELECT_DATA'
export const DELETE_QUERY_ROW = 'DELETE_QUERY_ROW'
export const UPDATE_CONJUNCTION = 'UPDATE_CONJUNCTION'
export const RECEIVE_OUTPUT_OPTION_DATA = 'RECEIVE_OUTPUT_OPTION_DATA'
export const UPDATE_OUTPUT_CHECKED = 'UPDATE_OUTPUT_CHECKED'
export const HANDLE_SELECT_ALL = 'HANDLE_SELECT_ALL'
export const UPDATE_SEARCH_SPACE_NAME = 'UPDATE_SEARCH_SPACE_NAME'
export const SUBMIT = 'SUBMIT'


export function submit() {
  return {
    type: SUBMIT
  }
}

export function updateQuery(rowIndex, colIndex, value) {
  return {
    type: UPDATE_CHOICE_ROW,
    rowIndex,
    colIndex,
    value,
  }
}

function requestQuerySelectData(path) {
  return {
    type: REQUEST_QUERY_SELECT_DATA,
    path,
  }
}

function receiveQuerySelectData(key, incoming) {
  return {
    type: RECEIVE_QUERY_SELECT_DATA,
    key,
    incoming,
  }
}

function receiveOutputOptionData(id, incoming) {
  return {
    type: RECEIVE_OUTPUT_OPTION_DATA,
    id,
    incoming,
  }
}

export function updateSearchSpaceName(searchSpaceName) {
  return {
    type: UPDATE_SEARCH_SPACE_NAME,
    searchSpaceName,
  }
}

export function updateConjunction(index, value) {
  return {
    type: UPDATE_CONJUNCTION,
    index,
    value,
  }
}

export function addQueryRow() {
  return {
    type: ADD_QUERY_ROW,
  }
}

export function handleSelectAll(sectionName, checked) {
  return {
    type: HANDLE_SELECT_ALL,
    sectionName,
    checked
  }
}

export function deleteRow(rowIndex) {
  return {
    type: DELETE_QUERY_ROW,
    rowIndex,
  }
}

export function handleCheckboxClick(sectionName, checkboxValue, checked) {
  return {
    type: UPDATE_OUTPUT_CHECKED,
    sectionName,
    checkboxValue,
    checked,
  }
}

function fetchQuerySelectData(key) {
  return dispatch => {
    dispatch(requestQuerySelectData(key))
    let parts = getQuerySelectDataParts(key)
    let URL
    switch (parts.length) {
      case 1:
        URL = `http://localhost:8000/querybuilder/${parts[0]}/all_json_models/`
        break
      case 2:
        URL = `http://localhost:8000/querybuilder/${parts[0]}/${parts[1]}/all_search_options/`
        break
      default:
        console.log('ERROR: unknown number of elements in URL path')
    }
    return fetch(URL)
      .then(response => response.json())
      .then(json => dispatch(receiveQuerySelectData(key, json)))
  }
}

function shouldFetchOutputOptionData(state, id) {
  return !state.outputOptions.hasOwnProperty(id)
}

function fetchOutputOptionData(id) {
  return dispatch => {
    URL = `http://localhost:8000/querybuilder/${id}/all_json_models/`
    return fetch(URL)
      .then(response => response.json())
      .then(json => dispatch(receiveOutputOptionData(id, json)))
  }
}

export function fetchOutputOptionDataIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchOutputOptionData(getState(), id)) {
      return dispatch(fetchOutputOptionData(id))
    }
  }
}

function shouldFetchQuerySelectData(state, key, rowIndex, colIndex) {
  const optionsCache = state.optionsCache
  let selectData
  if (key === '')
    return false
  if (colIndex >= 2)
    return false
  return !optionsCache.hasOwnProperty(key)
}

function getKey(state, rowIndex, colIndex, choice) {
  let choices = state.choiceRows[rowIndex]['choices']
  let parts = choices.slice(0, colIndex).concat(choice)
  return getQuerySelectDataKey(parts)
}

export function fetchQuerySelectDataIfNeeded(rowIndex, colIndex, choice) {
  return (dispatch, getState) => {
    let key = getKey(getState(), rowIndex, colIndex, choice)
    if (shouldFetchQuerySelectData(getState(), key, rowIndex, colIndex)) {
      console.log(key)
      return dispatch(fetchQuerySelectData(key))
    }
  }
}
  
