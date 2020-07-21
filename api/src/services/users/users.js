import { db } from 'src/lib/db'

export const user = ({ id }) => {
  return db.user.findOne({
    where: { id },
  })
}
export const users = () => {
  return db.user.findMany()
}

export const User = {
  accessTokens: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).accessTokens(),
  sites: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).sites(),
  deploys: (_obj, { root }) =>
    db.user.findOne({ where: { id: root.id } }).deploys(),
}
