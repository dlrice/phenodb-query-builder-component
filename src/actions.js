import 'whatwg-fetch'
import {getQuerySelectDataKey, getQuerySelectDataParts} from './utils'

export const ADD_QUERY_ROW = 'ADD_QUERY_ROW'
export const UPDATE_CHOICE_ROW = 'UPDATE_CHOICE_ROW'
export const RECEIVE_QUERY_SELECT_DATA = 'RECEIVE_QUERY_SELECT_DATA'
export const REQUEST_QUERY_SELECT_DATA = 'REQUEST_QUERY_SELECT_DATA'


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
    path
  }
}

function receiveQuerySelectData(key, incoming) {
  return {
    type: RECEIVE_QUERY_SELECT_DATA,
    key,
    incoming,
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


/**

phenotype:
  root: {}
  1: {}
  2: {}
  3: {}
study:
  root: {}


http://localhost:8000/querybuilder/phenotype/all_json_models/


http://localhost:8000/querybuilder/study/3/all_search_options/
http://localhost:8000/querybuilder/study/1/all_search_options/
http://localhost:8000/querybuilder/source/19/all_search_options/


let path = ['phenotype', '1']
let URL = `querybuilder/${path[0]}/${path[1]}/all_search_options/`

**/