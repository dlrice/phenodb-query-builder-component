import 'whatwg-fetch'
import { List, Map, fromJS } from 'immutable'

const nullChoices = fromJS({
  title: 'Filter on',
  choices: [
    {
      pk: 0,
      name: 'Phenotype',
    },
    {
      pk: 1,
      name: 'Platform',
    },
    {
      pk: 2,
      name: 'Study',
    },
    {
      pk: 3,
      name: 'External Source',
    },
  ]
})

let cache = Map()
cache = cache.set(List([0,0]), nullChoices)

function fetchSelectData(selectIndex, previousChoice) {

  console.log('here!')
  console.log(selectIndex)
  console.log(previousChoice)
  console.log(cache.toJS())
  const k = List([selectIndex, previousChoice])
  if (cache.has(k)) {
    // Already in local cache
    return cache.get(k)
  } else {
    // Fetch from server
    console.log('fetch from server')
    return cache.get(List([0,0]))
  }
}

export default fetchSelectData