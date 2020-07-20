import jwt from 'jsonwebtoken'

import { db } from 'src/lib/db'
import { getAccessToken } from 'src/lib/auth'

import { persistDeployData } from '../services/deploys/deploys'
import { getUserByAccessToken } from '../services/users/users'
import { updateSiteName } from '../services/sites/sites'
import { activeSiteTokenSecrets } from '../services/siteTokens/siteTokens'

const verifyDeployPayload = (payload, secret, claims = {}) => {
  // TODO verify audience based on permitted User->AccessToken.audience (to add)
  claims = {
    ...claims,
    // audience: 'urn:foo',
    issuer: 'netlify-plugin-deployed',
  }
  return jwt.verify(payload, secret, claims)
}

const requireUser = async (event) => {
  const user = await getUserByAccessToken(getAccessToken(event))
  if (!user) {
    throw new Error('Not permitted')
  }
  return user
}

const verifySiteId = (payload, secret, siteId) => {
  const claims = {
    subject: siteId,
  }
  return verifyDeployPayload(payload, secret, claims).sub
}

const verifiedSiteData = (payload, siteTokenSecrets, siteId) => {
  for (var secret of siteTokenSecrets) {
    try {
      return [verifySiteId(payload, secret, siteId), secret]
    } catch (error) {
      // Get yourself an 🥚 and beat it
    }
  }
  return null
}

const verifiedSite = async (event) => {
  const user = await requireUser(event)

  const payload = JSON.parse(event.body).payload
  const decoded = jwt.decode(payload)
  const siteId = decoded.data.siteId

  const siteTokenSecrets = await activeSiteTokenSecrets(siteId)

  const [verifiedSiteId, secret] = verifiedSiteData(
    payload,
    siteTokenSecrets,
    siteId
  )

  const data = jwt.verify(payload, secret).data

  const site = await db.site.findOne({
    where: {
      id_userId: { id: verifiedSiteId, userId: user.id },
    },
  })

  if (verifiedSiteId && siteId === verifiedSiteId) {
    return [user, site, data]
  } else {
    throw new Error('Invalid Site')
  }
}

export const handler = async (event, _context) => {
  try {
    const [user, site, data] = await verifiedSite(event)

    updateSiteName(site.id, data.siteName)

    const deploy = await persistDeployData(user, site, data)

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: { deployId: deploy.id, siteId: site.id, siteName: site.name },
      }),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 401,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
