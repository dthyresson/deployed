import jwt from 'jsonwebtoken'
import { AuthenticationError } from '@redwoodjs/api'
import { context } from '@redwoodjs/api/dist/globalContext'

import { userByUserId } from 'src/services/userManager/userManager'

const requireAccessToken = (decoded, { type, token }) => {
  if (token || type === 'auth0' || decoded?.sub) {
    return
  } else {
    throw new Error('Invalid token')
  }
}

export const getCurrentUser = async (decoded, { type, token }) => {
  try {
    const userId = decoded.sub

    requireAccessToken(decoded, { type, token })

    const user = await userByUserId(userId)
    if (user) return user
    console.log(decoded)
    return decoded
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

const getAccessToken = (event) => {
  const [schema, token] = event.headers?.authorization?.split(' ')

  if (!schema.length || schema !== 'Bearer' || !token.length) {
    throw new Error('Not permitted')
  }

  return token
}

export const verifyAccessToken = (event, claims = {}) => {
  claims = {
    ...claims,
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
  }

  return jwt.verify(
    getAccessToken(event),
    process.env.AUTH0_CLIENT_SECRET,
    claims
  )
}

export const verifyPayload = (event, claims = {}) => {
  verifyAccessToken(event)

  claims = {
    ...claims,
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_DOMAIN,
  }

  return jwt.verify(
    JSON.parse(event.body).payload,
    process.env.AUTH0_CLIENT_SECRET,
    claims
  )
}
