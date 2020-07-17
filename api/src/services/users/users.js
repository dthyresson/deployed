import { db } from 'src/lib/db'

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

export const getUserByAccessToken = async (secret) => {
  try {
    const accessToken = await db.accessToken.findOne({
      where: {
        secret: secret,
      },
      include: { user: true },
    })
    return accessToken.user
  } catch (error) {
    console.log(error)
    return null
  }
}
