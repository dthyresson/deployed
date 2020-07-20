import { backOff } from 'exponential-backoff'

import { registerUser } from 'src/services/registrations/registrations'
import { verifyPayload } from 'src/lib/auth'

export const handler = async (event, _context) => {
  try {
    const userId = verifyPayload(event).sub

    try {
      await backOff(() => registerUser(userId))
    } catch (error) {
      console.log('register backoff')
      console.log(error)
    }

    return {
      statusCode: 201,
      body: JSON.stringify(`register`),
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify(`Unauthorized`),
    }
  }
}
