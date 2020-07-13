import { render } from '@redwoodjs/testing'

import AppLayoutLayout from './AppLayoutLayout'

describe('AppLayoutLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppLayoutLayout />)
    }).not.toThrow()
  })
})
