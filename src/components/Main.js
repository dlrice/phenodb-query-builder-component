import React, { Component } from 'react'
import Section from './Section'


// import './App.css'


class Main extends Component {

  render() {
    return (
      <div>
        <Section
          title="FILTERS"
          onEditClicked={() => console.log('clicked!')}
        >
          External source NOTTINGHAM must be TRUE AND <br/>
          Phenotype Jewish ethnicity must not be null
        </Section>
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
      </div>
    )
  }
}

export default Main