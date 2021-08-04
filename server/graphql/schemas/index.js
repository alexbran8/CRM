const { gql } = require("apollo-server");

const tacdb = require("./tacdb");


const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [rootType, tacdb];
