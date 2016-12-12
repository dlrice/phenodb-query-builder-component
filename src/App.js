import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MenuItem, SelectField } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import './App.css'

injectTapEventPlugin()

const items = [
  <MenuItem key={1} value={1} primaryText="Center" />,
  <MenuItem key={2} value={2} primaryText="Phenotypes" />,
  <MenuItem key={3} value={3} primaryText="Individual" />,
  <MenuItem key={4} value={4} primaryText="Weekends" />,
  <MenuItem key={5} value={5} primaryText="Weekly" />,
]

/**
 * `SelectField` supports a floating label with the `floatingLabelText` property.
 * This can be fixed in place with the `floatingLabelFixed` property,
 * and can be customised with the `floatingLabelText` property.
 */
class SelectFieldExampleFloatingLabel extends Component {
  state = {
    value: null,
  }

  handleChange = (event, index, value) => this.setState({value})

  render() {
    return (
      <div>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText="Filter on"
          style={{margin: 10}}
        >
          {items}
        </SelectField>
      </div>
    )
  }
}

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div style={{ display: 'flex' }}>
          <SelectFieldExampleFloatingLabel />
          <SelectFieldExampleFloatingLabel />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
