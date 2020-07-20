import {
  createAccessToken,
  upsertUser,
} from 'src/services/userManager/userManager'

export const registerUser = async (userId) => {
  try {
    const user = await upsertUser({
      userIdentity: userId,
      emailVerified: false,
    })

    if (user.accessTokens?.length === 0) {
      await createAccessToken(user.id)
    }

    return user
  } catch (error) {
    throw new Error('Failed to register user')
  }
}
