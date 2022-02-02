const { gql } = require("apollo-server");

const tacdb = require("./tacdb");
// second app => see how to make this dynamic
const pip = require("./pip")

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [rootType, tacdb, pip];
