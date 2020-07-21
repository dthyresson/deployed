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

export const persistDeployData = async (user, site, data) => {
  delete data.siteName
  delete data.siteId

  return await db.deploy.upsert({
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
}
