const SEP = '|||'

export function getQuerySelectDataKey(parts) {
  return parts.join(SEP)
}

export function getQuerySelectDataParts(key) {
  return key.split(SEP)
}

export function parseIncomingSelectData(incoming, key) {
  let parts = getQuerySelectDataParts(key)
  let options
  if (parts.length === 1) {
    let nameKey = `${parts.slice(-1)[0]}_name`
    options = incoming.map((x) => (
      {
        ...x.fields,
        name: x['fields'][nameKey],
        value: x.pk,
      }
    ))
  } else if (parts.length === 2) {
    options = incoming.map((x) => (
      {
        name:x.text,
        value: x.value,
      }
    ))
  }
  return { options }
}

export function containsNull(x) {
  return x.match(/null/i)
}

export function isBooleanType(phenotypeValue, optionsCache) {
  phenotypeValue = Number(phenotypeValue)
  let entry = optionsCache.phenotype.options.filter(x => x.value === phenotypeValue)
  return entry[0].phenotype_type === 3
}