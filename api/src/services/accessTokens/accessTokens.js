import { nanoid } from 'nanoid'

import { db } from 'src/lib/db'

export const accessTokens = () => {
  return db.accessToken.findMany()
}

export const AccessToken = {
  user: (_obj, { root }) =>
    db.accessToken.findOne({ where: { id: root.id } }).user(),
}

export const createAccessToken = async (userId) => {
  try {
    const tokenData = {
      user: { connect: { id: userId } },
      name: 'Access Token',
      secret: nanoid(32),
    }

    const accessToken = await db.accessToken.create({ data: tokenData })
    return accessToken
  } catch (error) {
    throw new Error('Could not create user access token')
  }
}
