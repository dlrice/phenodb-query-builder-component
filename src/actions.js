export const ADD_QUERY_ROW = 'ADD_QUERY_ROW'
export const UPDATE = 'UPDATE'

export function updateQuery(rowIndex, colIndex, value) {
  return {
    type: UPDATE,
    rowIndex,
    colIndex,
    value,
  }
}