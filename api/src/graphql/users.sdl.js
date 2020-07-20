import gql from 'graphql-tag'

export const schema = gql`
  type User {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String
    emailVerified: Boolean
    lastIp: String
    lastLogin: DateTime!
    loginsCount: Int!
    name: String
    nickname: String
    picture: String
    userIdentity: String!
    accessTokens: [AccessToken]!
    sites: [Site]!
    deploys: [Deploy]!
  }

  type Query {
    users: [User!]!
  }

  input CreateUserInput {
    updatedAt: DateTime!
    email: String
    emailVerified: Boolean
    lastIp: String
    lastLogin: DateTime!
    loginsCount: Int!
    name: String
    nickname: String
    picture: String
    userIdentity: String!
  }

  input UpdateUserInput {
    updatedAt: DateTime
    email: String
    emailVerified: Boolean
    lastIp: String
    lastLogin: DateTime
    loginsCount: Int
    name: String
    nickname: String
    picture: String
    userIdentity: String
  }
`
