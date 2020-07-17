import { db } from 'src/lib/db'

export const sites = () => {
  return db.site.findMany()
}

export const Site = {
  user: (_obj, { root }) => db.site.findOne({ where: { id: root.id } }).user(),
  deploys: (_obj, { root }) =>
    db.site.findOne({ where: { id: root.id } }).deploys(),
  siteTokens: (_obj, { root }) =>
    db.site.findOne({ where: { id: root.id } }).siteTokens(),
  activeSiteTokens: (_obj, { root }) =>
    db.site.findOne({ where: { id: root.id } }).siteTokens(),
}

export const updateSiteName = async (siteId, siteName) => {
  return await db.site.update({
    where: { id: siteId },
    data: { name: siteName },
  })
}
