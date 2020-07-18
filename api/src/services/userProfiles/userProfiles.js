import { AuthenticationClient } from 'auth0'

import { db } from 'src/lib/db'

const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
})

export const getUserProfile = async (token) => {
  try {
    const auth0User = await auth0.getProfile(token)
    return {
      email: auth0User.email,
      emailVerified: auth0User.email_verified,
      lastIp: auth0User.last_ip,
      lastLogin: auth0User.last_login,
      loginsCount: auth0User.logins_count,
      name: auth0User.name,
      nickname: auth0User.nickname,
      picture: auth0User.picture,
      userId: auth0User.sub,
    }
  } catch (error) {
    throw new Error('Could not fetch profile')
  }
}

export const updateUserWithProfile = async (userProfile) => {
  try {
    const userWithProfile = await db.user.upsert({
      where: {
        userIdentity: userProfile.userId,
      },
      update: {
        email: userProfile.email,
        emailVerified: userProfile.emailVerified,
        lastIp: userProfile.lastIp,
        lastLogin: userProfile.lastLogin,
        loginsCount: userProfile.loginsCount,
        name: userProfile.name,
        nickname: userProfile.nickname,
        picture: userProfile.picture,
      },
      create: {
        email: userProfile.email,
        emailVerified: userProfile.emailVerified,
        lastIp: userProfile.lastIp,
        lastLogin: userProfile.lastLogin,
        loginsCount: userProfile.loginsCount,
        name: userProfile.name,
        nickname: userProfile.nickname,
        picture: userProfile.picture,
        userIdentity: userProfile.userId,
      },
    })

    return userWithProfile
  } catch (error) {
    throw new Error('Failed to update user and profile')
  }
}
