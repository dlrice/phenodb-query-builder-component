// import 'whatwg-fetch'
import "whatwg-fetch"
import { cloneDeep, includes } from 'lodash'
import Cookies from 'js-cookie'
import { 
  ADD_QUERY_ROW,
  UPDATE_CHOICE_ROW,
  RECEIVE_QUERY_SELECT_DATA,
  DELETE_QUERY_ROW,
  UPDATE_CONJUNCTION,
  RECEIVE_OUTPUT_OPTION_DATA,
  UPDATE_OUTPUT_CHECKED,
  HANDLE_SELECT_ALL,
  UPDATE_SEARCH_SPACE_NAME,
  SUBMIT,
} from './actions.js'
import {
  parseIncomingSelectData,
  parseIncomingOutputOptionData,
  containsNull,
  isBooleanType
} from './utils'
import {
  individual,
  sample,
} from './outputOptions'

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

const defaultChoiceRow = {choices:[''], max_n_choices: 3}
const defaultConjunction = 'and'
const defaultState = {
  choiceRows: [defaultChoiceRow],
  conjunctions: [],
  outputOptions: {
    individual, sample
  },
  searchSpace: {name: 'all'},
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
  } else if (action.type === RECEIVE_OUTPUT_OPTION_DATA) {
    let { id, incoming } = action
    let { outputOptions } = state
    console.log(id, incoming)
    let parsed = parseIncomingOutputOptionData(incoming, id)
    outputOptions = cloneDeep(outputOptions)
    outputOptions[id] = parsed
    console.log(outputOptions)
    return { ...state, outputOptions }
  } else if (action.type === UPDATE_OUTPUT_CHECKED) {
    let { sectionName, checkboxValue, checked } = action
    let { outputOptions } = state
    outputOptions = cloneDeep(outputOptions)
    let section = outputOptions[sectionName]
    let i, x
    for (i=0; i<section.length; i++) {
      x = section[i]
      if (x.value === checkboxValue)
        break
    }
    outputOptions[sectionName][i] = {...x, selected: checked }
    return { ...state, outputOptions }
  } else if (action.type === HANDLE_SELECT_ALL) {
    let { sectionName, checked } = action
    let { outputOptions } = state
    outputOptions = cloneDeep(outputOptions)
    let section = outputOptions[sectionName]
    console.log(sectionName, checked)
    section = section.map(x => (
      {...x, selected: checked}
    ))
    console.log(section)
    outputOptions[sectionName] = section
    return { ...state, outputOptions }
  } else if (action.type === UPDATE_SEARCH_SPACE_NAME) {
    let { searchSpaceName } = action
    let { searchSpace } = state
    searchSpace = cloneDeep(searchSpace)
    searchSpace.name = searchSpaceName
    return { ...state, searchSpace}
  } else if (action.type === SUBMIT) {
    let { choiceRows, conjunctions, searchSpace} = state
    // let formData = new FormData()
    
    // choiceRows.forEach(x => {
    //   formData.append('tables', x.choices[0])
    //   formData.append('where', x.choices[1])
    //   formData.append('is', x.choices[2])
    //   formData.append('querystr', x.choices[3])
    // })

    // formData.append('searchIn', searchSpace.name)
    // formData.append('andors', conjunctions)
    // formData.append('output', 'PhenodbID')


    let csrftoken = Cookies.get('csrftoken')
    // jQuery.ajaxSetup({
    //     beforeSend: function(xhr, settings) {
    //         if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
    //             xhr.setRequestHeader("X-CSRFToken", csrftoken);
    //         }
    //     }
    // })

    var form = new FormData()

    form.append('from', 'phenotype')
    form.append('where', '1')
    form.append('is', 'eq')
    form.append('querystr', 'male')
    form.append('andor', 'and')

    form.append('from', 'phenotype')
    form.append('where', '1')
    form.append('is', 'eq')
    form.append('querystr', 'male')
    form.append('andor', 'and')

    form.append('output', 'PhenodbID')
    form.append('searchIn', 'all')

    const temp = ["phenotype:1", "phenotype:2", "phenotype:3", "phenotype:4", "phenotype:5"]

    temp.forEach(x => form.append('output', x))

    fetch('http://localhost:8000/querybuilder/', {
      method: 'POST',
      body: form,
      headers: {
        'X-CSRFToken': csrftoken,

      },
    })
    .then(response => response.text())
    .then(body => console.log(body))
    .catch(e => console.log(e))

    
    // jQuery.post('/querybuilder/', {
    //   method: 'POST',
    //   data: formData,
    //   contentType:'multipart/form-data', 
    //     // tables    = request.POST.getlist('from')
    //     // wheres    = request.POST.getlist('where')
    //     // where_iss = request.POST.getlist('is')
    //     // querystrs = request.POST.getlist('querystr')                        
    //     // output    = request.POST.getlist('output')
    //     // search_in = request.POST.get('searchIn')
    //     // page      = request.GET.get('page')
    //     // andors    = request.POST.getlist('andor')

    //     // ['phenotype']
    //     // ['1']
    //     // ['eq']
    //     // ['male']
    //     // ['PhenodbID']
    //     // all
    //     // None
    //     // ['and']
    // })
    return state
  } else {
    return state
  }
}

export default queryApp


