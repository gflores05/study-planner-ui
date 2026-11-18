import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { Route } from 'react-router'
import { setTokens } from '@/services'
import { renderWithApp } from '@/test/render'
import { RequireAuth } from '.'

function renderProtected() {
  return renderWithApp(<RequireAuth />, {
    path: '/',
    initialEntries: ['/start'],
    extraRoutes: [
      <Route key="guard" element={<RequireAuth />}>
        <Route path="start" element={<h1>Protected</h1>} />
      </Route>
    ]
  })
}

describe('RequireAuth', () => {
  it('redirects to the login screen without a session', () => {
    renderProtected()

    expect(screen.queryByText('Protected')).not.toBeInTheDocument()
    expect(screen.getAllByTestId('location')[0]).toHaveTextContent('/login')
  })

  it('renders the route with a session', () => {
    setTokens({ access: 'access', refresh: 'refresh' })

    renderProtected()

    expect(screen.getByText('Protected')).toBeInTheDocument()
  })
})
