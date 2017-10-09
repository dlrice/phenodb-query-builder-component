import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Query from '../containers/Query'
import OutputCard from './OutputCard'

const styles = {
  main: {
    margin: '0 auto',
    width: '85%',
  }
}

class App extends Component {

  render() {
    return (
      <div style={styles.main}>
        <Typography type="headline" component="h1">
          Build Query
        </Typography>
        <Query />

        <Typography type="headline" component="h1">
          Select Output
        </Typography>
        <OutputCard /> <OutputCard />

        <Typography type="headline" component="h1">
          Select Search Space
        </Typography>
      </div>
    )
  }
}

export default App;