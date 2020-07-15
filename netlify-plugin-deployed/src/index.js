const got = require('got')

const netlifyEnvs = {
  nodeVersion: process.env.NODE_VERSION,
  nodeEnv: process.env.NODE_ENV,
  npmVersion: process.env.NPM_VERSION,
  npmFlags: process.env.NPM_FLAGS,
  npmToken: process.env.NPM_TOKEN,
  yarnVersion: process.env.YARN_VERSION,
  yarnFlags: process.env.YARN_FLAGS,
  rubyVersion: process.env.RUBY_VERSION,
  phpVersion: process.env.PHP_VERSION,
  hugoVersion: process.env.HUGO_VERSION,
  goVersion: process.env.GO_VERSION,
  goImportPath: process.env.GO_IMPORT_PATH,
  awsLambdaJsRuntime: process.env.AWS_LAMBDA_JS_RUNTIME,
  ci: process.env.CI,
  gitLfsEnabled: process.env.GIT_LFS_ENABLED,
  gitLfsFetchInclude: process.env.GIT_LFS_FETCH_INCLUDE,
  netlify: process.env.NETLIFY,
  buildId: process.env.BUILD_ID,
  context: process.env.CONTEXT,
  systemArch: process.env._system_arch,
  systemVersion: process.env._system_version,
  repositoryUrl: process.env.REPOSITORY_URL,
  branch: process.env.BRANCH,
  head: process.env.HEAD,
  commitRef: process.env.COMMIT_REF,
  cachedCommitRef: process.env.CACHED_COMMIT_REF,
  pullRequest: process.env.PULL_REQUEST,
  reviewId: process.env.REVIEW_ID,
  url: process.env.URL,
  deployUrl: process.env.DEPLOY_URL,
  deployPrimeUrl: process.env.DEPLOY_PRIME_URL,
  deployId: process.env.DEPLOY_ID,
  siteName: process.env.SITE_NAME,
  siteId: process.env.SITE_ID,
  netlifyImagesCdnDomain: process.env.NETLIFY_IMAGES_CDN_DOMAIN,
  incomingHookTitle: process.env.INCOMING_HOOK_TITLE,
  incomingHookUrl: process.env.INCOMING_HOOK_URL,
  incomingHookBody: process.env.INCOMING_HOOK_BODY,
}

module.exports = {
  onPreBuild: async ({ inputs }) => {
    const baseUrl = inputs.url
    const deployEndpoint = `${baseUrl}/.netlify/functions/deploy`

    console.log(deployEndpoint)
    console.log(netlifyEnvs)

    const { body } = await got.post(deployEndpoint, {
      json: {
        payload: netlifyEnvs,
      },
      responseType: 'json',
    })

    console.log(body.data)
  },
}
