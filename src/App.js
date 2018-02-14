import React, { Component } from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.data.loading === true ? "Loading" : this.props.data.search.edges.map(data =>
          <ul key={data.node.id}>
            <li style={{fontWeight: 'bold'}}><a href={data.node.url}>{data.node.name}</a></li>
            <li>{data.node.description}</li>
          </ul>
        )}
      </div>
    );
  }
}

const repoQuery = gql`
  query($name: String!){
    search(query: $name, last: 10, type: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            url
          }
        }
      }
    }
  }
`

const AppWithData = graphql(
  repoQuery,
  {
    options: {
      variables: {
        name: "tuts"
      }
    }
  }
)(App)

export default AppWithData;
