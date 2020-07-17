import { db } from 'src/lib/db'

import { getUserByAccessToken } from '../services/users/users'
import { activeSiteTokenSecrets } from '../services/siteTokens/siteTokens'

const jwt = require('jsonwebtoken')

const verifyPayload = (payload, secret, claims = {}) => {
  // TODO verify audience based on permitted User->AccessToken.audience (to add)
  claims = {
    ...claims,
    // audience: 'urn:foo',
    issuer: 'netlify-plugin-deployed',
  }
  return jwt.verify(payload, secret, claims)
}

const verifySiteId = (payload, secret, siteId) => {
  const claims = {
    subject: siteId,
  }
  return verifyPayload(payload, secret, claims).sub
}

const verifiedSiteId = (payload, siteTokenSecrets, siteId) => {
  for (var secret of siteTokenSecrets) {
    try {
      return [verifySiteId(payload, secret, siteId), secret]
    } catch (error) {
      // Get yourself an 🥚 and beat it
    }
  }
  return null
}

export const handler = async (event, _context) => {
  try {
    const [schema, token] = event.headers?.authorization?.split(' ')

    if (!schema.length || !token.length) {
      throw new Error('Not permitted')
    }

    const user = await getUserByAccessToken(token)

    if (!user) {
      throw new Error('Not permitted')
    }

    const body = JSON.parse(event.body)
    const decoded = jwt.decode(body.payload)

    const siteId = decoded.data.siteId

    const siteTokenSecrets = await activeSiteTokenSecrets(siteId)

    const [validSiteId, secret] = verifiedSiteId(
      body.payload,
      siteTokenSecrets,
      siteId
    )

    console.log(validSiteId)

    if (validSiteId && siteId === validSiteId) {
      const site = await db.site.findOne({
        where: {
          id_userId: { id: validSiteId, userId: user.id },
        },
      })

      console.log(site.name)

      const data = jwt.verify(body.payload, secret).data

      console.log(data)

      const deploy = await db.deploy.upsert({
        where: { id: data.id },
        update: {
          ...data,
        },
        create: {
          ...data,
          user: { connect: { id: user.id } },
          site: { connect: { id: site.id } },
        },
      })

      console.log(deploy)
      return {
        statusCode: 200,
        body: JSON.stringify({ data: 'hi' }),
      }
    } else {
      throw new Error('Not permitted')
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 401,
    }
  }
}
