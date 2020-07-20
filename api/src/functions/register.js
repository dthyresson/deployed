import { backOff } from 'exponential-backoff'

import { registerUser } from 'src/services/registrations/registrations'
import { verifyPayload } from 'src/lib/auth'

export const handler = async (event, _context) => {
  try {
    const userId = verifyPayload(event).sub

    await backOff(() => registerUser(userId))
  } catch (error) {
    console.log('register backoff')
    console.log(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(`register`),
  }
}
