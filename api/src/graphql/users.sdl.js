import gql from 'graphql-tag'

export const schema = gql`
  type User {
    uid: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    fullName: String!
    avatarUrl: String!
    email: String!
    site: [Site]!
    deploy: [Deploy]!
  }

  type Query {
    users: [User!]!
  }

  input CreateUserInput {
    uid: String!
    updatedAt: DateTime!
    fullName: String!
    avatarUrl: String!
    email: String!
  }

  input UpdateUserInput {
    uid: String
    updatedAt: DateTime
    fullName: String
    avatarUrl: String
    email: String
  }
`
