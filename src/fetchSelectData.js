import 'whatwg-fetch'
import { List, Map, fromJS } from 'immutable'

const firstChoices = fromJS({
  title: 'Filter on',
  choices: {
    phenotype: 'Phenotype', 
    platform: 'Platform', 
    study: 'Study', 
    source: 'External Source',
  }
})

let cache = Map()
cache = cache.set(List([0,'root']), firstChoices)

function fetchSelectData(depth, choice) {

  console.log('here!')
  console.log(depth)
  console.log(choice)
  console.log(cache.toJS())
  const k = List([depth, choice])
  if (cache.has(k)) {
    // Already in local cache
    return cache.get(k)
  } else {
    // Fetch from server
    console.log('fetch from server')
  }
}

export default fetchSelectData