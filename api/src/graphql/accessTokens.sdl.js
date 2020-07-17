import gql from 'graphql-tag'

export const schema = gql`
  type AccessToken {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    secret: String!
    revokedAt: DateTime
    User: User!
    userId: Int!
  }

  type Query {
    accessTokens: [AccessToken!]!
  }

  input CreateAccessTokenInput {
    updatedAt: DateTime!
    name: String!
    secret: String!
    revokedAt: DateTime
    userId: Int!
  }

  input UpdateAccessTokenInput {
    updatedAt: DateTime
    name: String
    secret: String
    revokedAt: DateTime
    userId: Int
  }
`
