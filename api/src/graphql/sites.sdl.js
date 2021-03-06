import gql from 'graphql-tag'

export const schema = gql`
  type Site {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    url: String
    user: User!
    userId: Int!
    deploys: [Deploy]!
    siteTokens: [SiteToken]!
  }

  type Query {
    sites: [Site!]!
  }

  input CreateSiteInput {
    updatedAt: DateTime!
    name: String!
    url: String
    userId: Int!
  }

  input UpdateSiteInput {
    updatedAt: DateTime
    name: String
    url: String
    userId: Int
  }
`
