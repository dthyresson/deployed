import { db } from 'src/lib/db'

export const deploys = () => {
  return db.deploy.findMany()
}

export const Deploy = {
  site: (_obj, { root }) =>
    db.deploy.findOne({ where: { id: root.id } }).site(),
  user: (_obj, { root }) =>
    db.deploy.findOne({ where: { id: root.id } }).user(),
}
