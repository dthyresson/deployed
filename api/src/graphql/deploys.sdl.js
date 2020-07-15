import gql from 'graphql-tag'

export const schema = gql`
  type Deploy {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    publishedAt: DateTime
    name: String!
    title: String!
    url: String!
    locked: Boolean!
    site: Site!
    siteId: String!
    User: User!
    userId: Int!
  }

  type Query {
    deploys: [Deploy!]!
  }

  input CreateDeployInput {
    updatedAt: DateTime!
    publishedAt: DateTime
    name: String!
    title: String!
    url: String!
    locked: Boolean!
    siteId: String!
    userId: Int!
  }

  input UpdateDeployInput {
    updatedAt: DateTime
    publishedAt: DateTime
    name: String
    title: String
    url: String
    locked: Boolean
    siteId: String
    userId: Int
  }
`
