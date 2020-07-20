import { db } from 'src/lib/db'

export const siteTokens = () => {
  return db.siteToken.findMany()
}

export const SiteToken = {
  site: (_obj, { root }) =>
    db.siteToken.findOne({ where: { id: root.id } }).site(),
}
