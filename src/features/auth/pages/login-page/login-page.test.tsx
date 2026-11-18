import { afterEach, describe, expect, it, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithApp } from '@/test/render'
import { axiosHttpError } from '@/test/axios'
import { AuthService, UserService } from '../../services'
import { LoginPage } from '.'

const tokens = {
  access_token: 'access',
  refresh_token: 'refresh',
  token_type: 'bearer' as const
}

function renderLogin(from?: string) {
  return renderWithApp(<LoginPage />, {
    path: '/login',
    initialEntries: [
      { pathname: '/login', state: from ? { from: { pathname: from } } : null }
    ]
  })
}

async function submit() {
  await userEvent.type(screen.getByLabelText('Email'), 'jane@example.com')
  await userEvent.type(screen.getByLabelText('Password'), 'secret')
  await userEvent.click(screen.getByRole('button', { name: /log in/i }))
}

describe('LoginPage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('links to the register screen', () => {
    renderLogin()

    // Base UI renders the link-styled button with role="button".
    expect(
      screen.getByRole('button', { name: /create an account/i })
    ).toHaveAttribute('href', '/register')
  })

  it('returns to the page that required the login', async () => {
    vi.spyOn(AuthService, 'login').mockResolvedValue(tokens)
    vi.spyOn(UserService, 'get').mockResolvedValue({
      id: '1',
      email: 'jane@example.com',
      name: 'Jane'
    })
    renderLogin('/start')

    await submit()

    await waitFor(() =>
      expect(screen.getAllByTestId('location')[0]).toHaveTextContent('/start')
    )
  })

  it('shows invalid credentials', async () => {
    vi.spyOn(AuthService, 'login').mockRejectedValue(
      axiosHttpError(401, { error: 'UserInvalidCredentials' })
    )
    renderLogin()

    await submit()

    expect(
      await screen.findByText('Invalid email or password')
    ).toBeInTheDocument()
    expect(screen.getAllByTestId('location')[0]).toHaveTextContent('/login')
  })
})
