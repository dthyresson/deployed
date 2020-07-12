require('dotenv').config()
const chalk = require('chalk')
const got = require('got')

const STDOUT = '#DEADED'
const ERR = '#FF0000'

const validate = ({ options }) => {
  if (!process.env.HEROKU_API_TOKEN) {
    throw new Error('Missing Heroku Authorization token.')
  }

  if (!options.appName) {
    throw new Error('Missing Heroku Application')
  }

  if (!options.config) {
    throw new Error('Missing Heroku Database Url Config')
  }
}

const getDatabaseUrl = async ({ options }) => {
  validate({ options })

  try {
    const body = await got(
      `https://api.heroku.com/apps/${options.appName}/config-vars`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          Authorization: `Bearer ${process.env.HEROKU_API_TOKEN}`,
        },
      }
    ).json()

    const databaseUrl = body[options.config]
    if (!databaseUrl || databaseUrl.length === 0) {
      throw new Error(`Missing Heroku config ${options.config}`)
    }

    console.log(`${options.config} ends in ${databaseUrl.slice(-5)}`)

    return databaseUrl
  } catch (error) {
    throw new Error((error.response && error.response.body) || error)
  }
}

const log = (message, color = STDOUT) => {
  console.log(chalk.hex(color)(message))
}

module.exports = {
  onPreBuild: async ({ inputs, utils }) => {
    try {
      const options = {
        appName: inputs.app_name,
        config: inputs.heroku_config || 'DATABASE_URL',
      }

      log(
        `Setting Netlify ENV ${inputs.netlify_env} to Heroku config database connection.`
      )

      process.env[inputs.netlify_env] = await getDatabaseUrl({
        options,
      })
    } catch (error) {
      const message = `Unable to update ${inputs.netlify_env} from Heroku config`
      log(message, ERR)
      log(error, ERR)
      utils.build.failBuild(message)
    }
  },
}
