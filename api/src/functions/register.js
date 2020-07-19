import { registerUser } from 'src/services/registrations/registrations'

const jwt = require('jsonwebtoken')

export const handler = async (event, _context) => {
  const headers = event.headers
  console.log(headers.authorization)

  const payload = JSON.parse(event.body).payload

  console.log(jwt.decode(payload))

  const userId = jwt.decode(payload).sub

  console.log(userId)

  const user = await registerUser(userId)
  console.log(user)

  return {
    statusCode: 200,
    body: JSON.stringify(`register`),
  }
}
