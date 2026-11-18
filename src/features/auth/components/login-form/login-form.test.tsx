import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '.'

describe('LoginForm', () => {
  it('validates the fields before submitting', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await userEvent.click(screen.getByRole('button', { name: /log in/i }))

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Password is required')).toBeInTheDocument()

    await userEvent.type(screen.getByLabelText('Email'), 'not-an-email')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))

    expect(await screen.findByText('Enter a valid email')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits the credentials', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText('Email'), 'jane@example.com')
    await userEvent.type(screen.getByLabelText('Password'), 'secret')
    await userEvent.click(screen.getByRole('button', { name: /log in/i }))

    expect(onSubmit).toHaveBeenCalledWith(
      { email: 'jane@example.com', password: 'secret' },
      expect.anything()
    )
  })

  it('shows the server error and disables the button while submitting', () => {
    render(
      <LoginForm
        onSubmit={vi.fn()}
        submitting
        error="Invalid email or password"
      />
    )

    expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /log in/i })).toBeDisabled()
  })
})
