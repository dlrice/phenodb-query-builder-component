import React, { Component } from 'react'
import Section from './Section'
import FiltersSection from './FiltersSection'
import RaisedButton from 'material-ui/RaisedButton'


// import './App.css'


class Main extends Component {

  getStyle() {
    return {
      main: {
        paddingLeft: '20%',
        paddingRight: '20%',
      },
      searchButton: {
        margin: 12,
      }
    }
  }

  render() {
    const style = this.getStyle()
    return (
      <div style={style.main}>
        <FiltersSection />
        <Section
          title="RESULT ATTRIBUTES"
          onEditClicked={() => console.log('clicked!')}
        >
          Something else.
        </Section>
        <Section
          title="SEARCH SPACE"
          onEditClicked={() => console.log('clicked!')}
        >
          These components behave just like a React class with only a render method defined. Since no component instance is created for a functional component, any ref added to one will evaluate to null. Functional components do not have lifecycle methods, but you can set .propTypes and .defaultProps as properties on the function.
        </Section>
        <RaisedButton label="SEARCH" primary={true} style={style.searchButton} />
      </div>
    )
  }
}

export default Main