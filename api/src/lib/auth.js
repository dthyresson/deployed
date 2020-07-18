import { AuthenticationError } from '@redwoodjs/api'
import { context } from '@redwoodjs/api/dist/globalContext'

import {
  getUserProfile,
  updateUserWithProfile,
} from 'src/services/userProfiles/userProfiles'
import { createAccessToken } from 'src/services/accessTokens/accessTokens'
import { userByUserId } from 'src/services/users/users'

const isValidToken = (decoded, { type, token }) => {
  return token || type === 'auth0' || decoded?.sub
}

export const getCurrentUser = async (decoded, { type, token }) => {
  try {
    if (!isValidToken(decoded, { type, token })) {
      throw new Error('Invalid token')
    }

    const user = await userByUserId(decoded.sub)

    if (!user || user === undefined) {
      const userProfile = await getUserProfile(token)

      if (userProfile) {
        const newUser = await updateUserWithProfile(userProfile)
        await createAccessToken(newUser.id)
        return newUser
      }
    }

    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

// Use this function in your services to check that a user is logged in, and
// optionally raise an error if they're not.

export const requireAuth = () => {
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}
