import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_ARTICLES = gql`
  {
    # This is a query exposed by the Drupal graphql module
    nodeQuery(
      filter: { conditions: { field: "type", value: "article" } }
      sort: { field: "changed", direction: ASC }
      limit: 10
    ) {
      entities {
        # This tells graphql wich type the entities have
        ... on NodeArticle {
          # And these are the fields we want to fetch
          entityId
          title
          fieldImage {
            alt
            title
            width
            height
            url
          }
          body {
            summaryProcessed
          }
        }
      }
    }
  }
`;

const ArticleList = () => {
  return (
    <div className="ArticleList">
      <Query query={GET_ARTICLES}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          // The actual entities are in data.nodeQuery.entities
          const {
            nodeQuery: { entities }
          } = data;
          console.log(entities);
          return "I am an ArticleList!";
        }}
      </Query>
    </div>
  );
};

export default ArticleList;
