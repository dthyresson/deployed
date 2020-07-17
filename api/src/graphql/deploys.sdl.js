import gql from 'graphql-tag'

export const schema = gql`
  type Deploy {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    nodeVersion: String
    yarnVersion: String
    rubyVersion: String
    goVersion: String
    ci: Boolean
    netlify: Boolean
    buildId: String
    context: String
    repositoryUrl: String
    branch: String
    head: String
    commitRef: String
    cachedCommitRef: String
    pullRequest: Boolean
    url: String
    deployUrl: String
    deployPrimeUrl: String
    netlifyImagesCdnDomain: String
    status: String
    errorName: String
    errorMessage: String
    buildStartedAt: DateTime
    buildEndedAt: DateTime
    errorAt: DateTime
    successAt: DateTime
    site: Site!
    siteId: String!
    user: User!
    userId: Int!
  }

  type Query {
    deploys: [Deploy!]!
  }

  input CreateDeployInput {
    updatedAt: DateTime!
    nodeVersion: String
    yarnVersion: String
    rubyVersion: String
    goVersion: String
    ci: Boolean
    netlify: Boolean
    buildId: String
    context: String
    repositoryUrl: String
    branch: String
    head: String
    commitRef: String
    cachedCommitRef: String
    pullRequest: Boolean
    url: String
    deployUrl: String
    deployPrimeUrl: String
    netlifyImagesCdnDomain: String
    status: String
    errorName: String
    errorMessage: String
    buildStartedAt: DateTime
    buildEndedAt: DateTime
    errorAt: DateTime
    successAt: DateTime
    siteId: String!
    userId: Int!
  }

  input UpdateDeployInput {
    updatedAt: DateTime
    nodeVersion: String
    yarnVersion: String
    rubyVersion: String
    goVersion: String
    ci: Boolean
    netlify: Boolean
    buildId: String
    context: String
    repositoryUrl: String
    branch: String
    head: String
    commitRef: String
    cachedCommitRef: String
    pullRequest: Boolean
    url: String
    deployUrl: String
    deployPrimeUrl: String
    netlifyImagesCdnDomain: String
    status: String
    errorName: String
    errorMessage: String
    buildStartedAt: DateTime
    buildEndedAt: DateTime
    errorAt: DateTime
    successAt: DateTime
    siteId: String
    userId: Int
  }
`
