import { gql } from "@apollo/client";

export const typeDefs = gql`
  type Mutation {
    writeJsonFile(path: String, jsonString: String!): String!
  }
  type Query {
    test: String!
  }
`;
