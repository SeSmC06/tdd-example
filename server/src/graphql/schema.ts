import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type UserProfile {
    id: String!
    name: String!
    email: String!
    profilePicture: String
  }
  input UserRequestParam {
    userId: ID!
  }
  type Query {
    userProfile(userRequestParam: UserRequestParam!): UserProfile
  }
`;
