import { db } from 'src/lib/db'

export const accessTokens = () => {
  return db.accessToken.findMany()
}

export const AccessToken = {
  user: (_obj, { root }) =>
    db.accessToken.findOne({ where: { id: root.id } }).user(),
}
