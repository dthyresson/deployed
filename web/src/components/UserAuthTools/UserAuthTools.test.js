import { render } from '@redwoodjs/testing'

import UserAuthTools from './UserAuthTools'

describe('UserAuthTools', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserAuthTools />)
    }).not.toThrow()
  })
})
