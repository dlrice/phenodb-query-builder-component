// @flow weak
import { connect } from 'react-redux'
import SearchSpaceSection from '../components/SearchSpaceSection'
import {
  updateSearchSpaceName,
} from '../actions'


const mapStateToProps = state => (
  {
    searchSpace: state.searchSpace,
  }
)

const mapDispatchToProps = dispatch => (
  {
    handleSubsetClick: (searchSpaceName) => (
      dispatch(updateSearchSpaceName(searchSpaceName))
    ),
  }
)

const SearchSpace = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchSpaceSection)

export default SearchSpace