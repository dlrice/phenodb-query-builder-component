import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Query from '../containers/Query'
import Output from '../containers/Output'
import SearchSpace from '../containers/SearchSpace'
import SubmitButton from '../containers/SubmitButton'


const styles = {
  main: {
    margin: '0 auto',
    width: '85%',
  },
  section: {
    marginTop: 30,
  },
}

class App extends Component {


  render() {
    return (

      <div style={styles.main}>

        <Typography type="headline" component="h1" style={styles.section}>
          Build Query
        </Typography>
        <Query />

        <Typography type="headline" component="h1" style={styles.section}>
          Select Output
        </Typography>
        <Output />

        <Typography type="headline" component="h1" style={styles.section}>
          Select Search Space
        </Typography>
        <SearchSpace />

        <SubmitButton />
        
      </div>
    )
  }
}

export default App