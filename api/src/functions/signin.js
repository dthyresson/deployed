import { backOff } from 'exponential-backoff'

import { signIn } from 'src/services/signIns/signIns'
import { verifyPayload } from 'src/lib/auth'

export const handler = async (event, _context) => {
  try {
    const userId = verifyPayload(event).sub

    try {
      await backOff(() => signIn(userId))
    } catch (error) {
      console.log('signin backoff')
      console.log(error)
    }

    return {
      statusCode: 201,
      body: JSON.stringify(`signIn`),
    }
  } catch (error) {
    return {
      statusCode: 401,
      body: JSON.stringify(`Unauthorized`),
    }
  }
}
