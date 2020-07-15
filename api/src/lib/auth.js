import { AuthenticationClient } from 'auth0'
import { AuthenticationError } from '@redwoodjs/api'
import { context } from '@redwoodjs/api/dist/globalContext'

import { db } from 'src/lib/db'

const auth0 = new AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
})

const getUser = async (userId) => {
  await db.user.findOne({
    where: {
      userId: userId,
    },
  })
}
const getUserProfile = async (token) => {
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

const updateUserWithProfile = async (userProfile) => {
  try {
    const userWithProfile = await db.user.upsert({
      where: {
        userId: userProfile.userId,
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
      create: userProfile,
    })
    return userWithProfile
  } catch (error) {
    throw new Error('Failed to update user and profile')
  }
}

const isValidToken = (decoded, { type, token }) => {
  return token || type === 'auth0' || decoded?.sub
}

export const getCurrentUser = async (decoded, { type, token }) => {
  if (!isValidToken(decoded, { type, token })) {
    return decoded
  }

  try {
    const user = await getUser(decoded.sub)

    if (!user) {
      const userProfile = await getUserProfile(token)
      if (userProfile) {
        return await updateUserWithProfile(userProfile)
      }
    }

    return user
  } catch (error) {
    console.log(error)
    return decoded
  }
}

// Use this function in your services to check that a user is logged in, and
// optionally raise an error if they're not.

export const requireAuth = () => {
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}
