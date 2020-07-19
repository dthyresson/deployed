import { AuthenticationError } from '@redwoodjs/api'
import { context } from '@redwoodjs/api/dist/globalContext'

import { registerUser } from 'src/services/registrations/registrations'
import { userByUserId } from 'src/services/users/users'

const requireAccessToken = (decoded, { type, token }) => {
  if (token || type === 'auth0' || decoded?.sub) {
    return
  } else {
    throw new Error('Invalid token')
  }
}

export const getCurrentUser = async (decoded, { type, token }) => {
  try {
    let user = null
    const userId = decoded.sub

    requireAccessToken(decoded, { type, token })

    if ((user = await userByUserId(userId))) {
      return user
    }

    user = registerUser(userId)

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
