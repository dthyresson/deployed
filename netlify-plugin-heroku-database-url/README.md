# 🔌 netlify-plugin-heroku-database-url

As a best practice, sets the necessary `DATABASE_URL` env to the current value in Heroku config on Netlify build and deploy.

## Why?

Are you using [Heroku](https://www.heroku.com) to host your [PostgreSQL database](https://devcenter.heroku.com/articles/heroku-postgresql)?

Did you know that [Heroku](https://www.heroku.com) can change your `database URL` at anytime for any numbner of reasons?

Yup. It can happen.

And if it does, any app that simply copy-pasted the `DATABASE_URL` connection from its config and uses that value to connect is going to break.

In fact, Heroku [tells you](https://devcenter.heroku.com/articles/connecting-to-heroku-postgres-databases-from-outside-of-heroku#credentials) not to:

```
Do not copy and paste database credentials to a separate environment or into your application’s code. The database URL is managed by Heroku and will change under some circumstances.
```

But, everyone does, right? I do (did?).

When [can](https://devcenter.heroku.com/articles/connecting-to-heroku-postgres-databases-from-outside-of-heroku#credentials) it happen?

- User-initiated database credential rotations using `heroku pg:credentials:rotate`.
- Catastrophic hardware failures that require Heroku Postgres staff to recover your database on new hardware.
- Security issues or threats that require Heroku Postgres staff to rotate database credentials.
- Automated failover events on HA-enabled plans.

It is best practice to always fetch the database URL config var from the corresponding Heroku app when your application starts ... or in our case, builds and deploys on Netlify.

## Setup

### Heroku Authorization Token

You'll need to [create a Heroku Authorization Token](https://devcenter.heroku.com/articles/platform-api-quickstart#authentication) to access the API.

You can create an authorization token via the [Heroku cli](https://devcenter.heroku.com/articles/platform-api-quickstart#authentication) or via the Heroku Dashboard Application section.

### Netlify Environment Config

```
HEROKU_API_TOKEN=
```

## Usage

Add a `[[plugins]]` entry to your `netlify.toml` file.

Note since this package is not published, you'll have to use [File based installation](https://docs.netlify.com/configure-builds/build-plugins/#file-based-installation) and copy the contents of this repo to the root of your project.

```
[[plugins]]
package = './netlify-plugin-heroku-database-url'
```

### Required Settings

You must provide the name of the application -- `app_name` -- to which the Heroku database is attached as a resource.

```
inputs:
  - name: app_name
    description: Name of Heroku application
    required: true
  - name: heroku_config
    description: Config setting key that stores the connection url to the database to use
    default: DATABASE_URL
  - name: netlify_env
    description: Env key to use when setting connection in Netlify
    default: DATABASE_URL
```

For example, if both Heroku and Netlify store the database connection string in `DATABASE_URL` mthen you simply need to specify the `app_name`.

```
  [plugins.inputs]
  app_name = "my-heroku-app-that-has-db-as-reosource"

```

If for some reason, they do not:

```
  [plugins.inputs]
  app_name = "my-heroku-app-that-has-db-as-reosource"
  heroku_config=HEROKU_POSTGRESQL_PURPLE_URL
  netlify_env=PROD_DATABASE_URL
```

However, Heroku will keep the most current value in `DATABASE_URL`.

### Netlify Env Configuration

- no need to set or declare

### Use in conjunction with netlify-plugin-redwoodjs-env-validator

However, if using `netlify-plugin-redwoodjs-env-validator` this will expect a `DATABASE_URL` to be defined in Netlify, so provide a dummmy value that will be overridden an build time.

### Use in conjunction with Prisma

If using w/ RedwoodJS and prisma through the [netlify-plugin-prisma-provider](https://github.com/redwoodjs/netlify-plugin-prisma-provider)

### Order matters

```
When multiple plugins are set to run in the same stage, they will run in the order they are listed in the Netlify configuration file.
```

List `netlify-plugin-heroku-database-url` before `netlify-plugin-prisma-provider` and `netlify-plugin-redwoodjs-env-validator`.

## Local Use

You can [run builds in Netlify CLI](https://docs.netlify.com/cli/get-started/#run-builds-locally) to mimic the behavior of running a build on Netlify — including Build Plugins.

### Run Netlify builds locally

You will ned to install the [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation).

```
# Install Netlify CLI globally
npm install netlify-cli -g

### OR use Yarn ###
yarn global add netlify-cli
```

To execute a Netlify build locally, run the following command from the root of your project:

```
netlify build
```

If you'd like to get a summary of what a build will do without taking the time to do a full build, you can use the --dry flag:

```
netlify build --dry
```
