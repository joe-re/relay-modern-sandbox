import React from 'react';
import ReactDOM from 'react-dom';
import Repositories from './components/Repositories';
import { QueryRenderer, graphql } from 'react-relay';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const mountNode = document.getElementById('root');

function fetchQuery(
  operation,
  variables,
) {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer token'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

const modernEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

ReactDOM.render(
  <QueryRenderer
    environment={modernEnvironment}
    query={graphql`
      query appQuery {
        viewer {
          ...Repositories_viewer
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      console.log(props);
      if (props) {
        return <Repositories viewer={props.viewer} />;
      }
      return <div>Loading</div>;
    }}
  />,
  mountNode
);
