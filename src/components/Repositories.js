import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

class Repositories extends React.Component {
  render() {
    console.log(this.props.viewer);
    const repos = this.props.viewer.repositories.nodes.map(v => <div>{v.name}</div>);
    return (
      <div>
        {this.props.viewer.company}
        {repos}
      </div>
    );
  }
}

export default createFragmentContainer(Repositories, {
  viewer: graphql`
    fragment Repositories_viewer on User {
      repositories(first: 10) {
        totalCount,
        nodes {
          name
        }
      }
    }
  `
});
