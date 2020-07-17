import { db } from 'src/lib/db'

export const siteTokens = () => {
  return db.siteToken.findMany()
}

export const activeSiteTokens = async (siteId) => {
  return db.siteToken.findMany({
    where: {
      siteId: { equals: siteId },
      revokedAt: { equals: null },
    },
  })
}

export const activeSiteTokenSecrets = async (siteId) => {
  const tokens = await activeSiteTokens(siteId)
  return tokens.map((siteToken) => siteToken.secret)
}

export const SiteToken = {
  site: (_obj, { root }) =>
    db.siteToken.findOne({ where: { id: root.id } }).site(),
}
