import 'whatwg-fetch'
import { List, Map, fromJS } from 'immutable'

const nullChoices = fromJS({
  title: 'Filter on',
  choices: {
    phenotype: 'Phenotype', 
    platform: 'Platform', 
    study: 'Study', 
    source: 'External Source',
  }
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
  }
}

export default fetchSelectData