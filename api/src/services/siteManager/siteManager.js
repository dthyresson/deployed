import { db } from 'src/lib/db'

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

export const updateSiteName = async (siteId, siteName) => {
  return await db.site.update({
    where: { id: siteId },
    data: { name: siteName },
  })
}
