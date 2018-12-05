// @flow weak
import { connect } from 'react-redux'
import OutputSection from '../components/OutputSection'
import {
  handleCheckboxClick,
  fetchOutputOptionDataIfNeeded,
  handleSelectAll,
} from '../actions'


const sections = [{
  id: 'individual',
  title: 'Individual details'
}, {
  id: 'sample',
  title: 'Sample details'
}, {
  id: 'phenotype',
  title: 'Phenotypes'
}, {
  id: 'study',
  title: 'Studies'
}]

const mapStateToProps = state => {
  return {
    checkboxData: state.outputOptions,
    sections 
  }
}

const mapDispatchToProps = dispatch => (
  {
    handleCheckboxClick: (sectionName, checkboxName, checked) => (
      dispatch(handleCheckboxClick(sectionName, checkboxName, checked))
    ),
    fetchOutputOptionDataIfNeeded: (name) => (
      dispatch(fetchOutputOptionDataIfNeeded(name))
    ),
    handleSelectAll: (sectionName, checked) => (
      dispatch(handleSelectAll(sectionName, checked))
    )
    
  }
)

const Output = connect(
  mapStateToProps,
  mapDispatchToProps
)(OutputSection)

export default Output