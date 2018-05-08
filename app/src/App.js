import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from 'react-apollo';
import {InMemoryCache} from 'apollo-cache-inmemory';

import gql from "graphql-tag";
import { Query } from "react-apollo";

const clusterName = window.location.host.split('.')[1];
// const clusterName = 'historicity14';
const GRAPHQL_URL = "https://data." + clusterName + ".hasura-app.io/v1alpha1/graphql";

const client = new ApolloClient({
  link: createHttpLink({
    uri: GRAPHQL_URL,
    credentials: 'include'
  }),
  cache: new InMemoryCache({
    addTypename: false
  })
});

const QUERY = gql`
  query fetch {
    test {
      id
      name
    }
  }
`;

class App extends Component {
  render() {
    const f = ({loading, error, data}) => {
      if (loading) {
        return 'Loading...';
      }
      if (error) {
        return ('Error! ' + error.message);
      }
      return (JSON.stringify(data, null, '\t'))
    };

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to GraphQL</h1>
          </header>
        </div>
        <div style={{maxWidth: "800px", margin: "0 auto", paddingTop: "20px", fontSize: "1.2em"}}>
          <pre>
            <Query query={QUERY}>
              {f}
            </Query>
          </pre>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
