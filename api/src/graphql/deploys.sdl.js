import gql from 'graphql-tag'

export const schema = gql`
  type Deploy {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    publishedAt: DateTime!
    siteId: String!
    userId: String!
    name: String!
    title: String!
    url: String!
    locked: Boolean!
    site: Site!
    user: User!
  }

  type Query {
    deploys: [Deploy!]!
  }

  input CreateDeployInput {
    updatedAt: DateTime!
    publishedAt: DateTime!
    siteId: String!
    userId: String!
    name: String!
    title: String!
    url: String!
    locked: Boolean!
  }

  input UpdateDeployInput {
    updatedAt: DateTime
    publishedAt: DateTime
    siteId: String
    userId: String
    name: String
    title: String
    url: String
    locked: Boolean
  }
`
