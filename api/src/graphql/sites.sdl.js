import gql from 'graphql-tag'

export const schema = gql`
  type Site {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    accountName: String!
    accountSlug: String!
    url: String!
    screenshotUrl: String
    user: User!
    userId: Int!
    deploys: [Deploy]!
  }

  type Query {
    sites: [Site!]!
  }

  input CreateSiteInput {
    updatedAt: DateTime!
    name: String!
    accountName: String!
    accountSlug: String!
    url: String!
    screenshotUrl: String
    userId: Int!
  }

  input UpdateSiteInput {
    updatedAt: DateTime
    name: String
    accountName: String
    accountSlug: String
    url: String
    screenshotUrl: String
    userId: Int
  }
`
