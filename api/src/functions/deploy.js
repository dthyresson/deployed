export const handler = async (event, _context) => {
  console.log(event.body)
  return {
    statusCode: 200,
    body: JSON.stringify({ data: event.body }),
  }
}
