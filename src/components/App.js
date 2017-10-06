import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import Query from '../containers/Query'

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
          Query
        </Typography>
        <Query />
      </div>
    )
  }
}

export default App;