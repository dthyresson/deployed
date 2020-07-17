import gql from 'graphql-tag'

export const schema = gql`
  type SiteToken {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    secret: String!
    revokedAt: DateTime
    site: Site!
    siteId: String!
  }

  type Query {
    siteTokens: [SiteToken!]!
  }

  input CreateSiteTokenInput {
    updatedAt: DateTime!
    name: String!
    secret: String!
    revokedAt: DateTime
    siteId: String!
  }

  input UpdateSiteTokenInput {
    updatedAt: DateTime
    name: String
    secret: String
    revokedAt: DateTime
    siteId: String
  }
`
