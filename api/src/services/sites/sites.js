import { db } from 'src/lib/db'

export const sites = () => {
  return db.site.findMany()
}

export const Site = {
  user: (_obj, { root }) => db.site.findOne({ where: { id: root.id } }).user(),
  deploys: (_obj, { root }) =>
    db.site.findOne({ where: { id: root.id } }).deploys(),
}
