// @flow weak

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import OutputCard from './OutputCard'


const styles = theme => ({
});

const OutputSection = ({sections, checkboxData,handleCheckboxClick, fetchOutputOptionDataIfNeeded, handleSelectAll, classes}) => {
  const sectionNodes = sections.map((section, index) => {
    console.log(section)
    return (
      <div key={index}>
        <OutputCard
          title={section.title}
          checkboxData={checkboxData[section.id]}
          fetchOutputOptionDataIfNeeded={() => fetchOutputOptionDataIfNeeded(section.id)}
          handleCheckboxClick={(checkboxName, checked) => handleCheckboxClick(section.id, checkboxName, checked)}
          handleSelectAll={(checked) => handleSelectAll(section.id, checked)}
        />
      </div>
    )
  })

  return (
    <div>
      {sectionNodes}
    </div>
  )
}

export default withStyles(styles)(OutputSection)