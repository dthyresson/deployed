const jwt = require('jsonwebtoken')
export const handler = async (event, _context) => {
  const body = JSON.parse(event.body)
  const decoded = jwt.decode(body.payload)
  const verified = jwt.verify(body.payload, 'shhhhh')
  // const notverified = jwt.verify(body.payload, 'foo')
  console.log(decoded)
  console.log(verified)
  // console.log(notverified)
  return {
    statusCode: 200,
    body: JSON.stringify({ data: decoded }),
  }
}
