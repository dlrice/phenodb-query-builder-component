import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Main from './components/Main'

injectTapEventPlugin()

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Main/>
      </MuiThemeProvider>
    )
  }
}

export default App