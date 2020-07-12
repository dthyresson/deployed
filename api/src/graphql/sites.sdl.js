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
    screenshotUrl: String!
    user: User!
    userId: String!
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
    screenshotUrl: String!
    userId: String!
  }

  input UpdateSiteInput {
    updatedAt: DateTime
    name: String
    accountName: String
    accountSlug: String
    url: String
    screenshotUrl: String
    userId: String
  }
`
