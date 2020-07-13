import NetlifyAPI from 'netlify'
import { AuthenticationError } from '@redwoodjs/api'
import { context } from '@redwoodjs/api/dist/globalContext'

// import { db } from 'src/lib/db'

export const getCurrentUser = async (decoded, { type, token }) => {
  if (context.currentUser?.id) {
    return context.currentUser
  }

  if (type === 'netlifyOAuth' && token) {
    const client = new NetlifyAPI(token)
    const user = await client.getCurrentUser()
    context.currentUser = user
    return user
  } else {
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
