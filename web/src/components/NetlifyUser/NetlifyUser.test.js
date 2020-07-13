import { render } from '@redwoodjs/testing'

import NetlifyUser from './NetlifyUser'

describe('NetlifyUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NetlifyUser />)
    }).not.toThrow()
  })
})
