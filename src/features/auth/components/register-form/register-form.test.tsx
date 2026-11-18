import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegisterForm } from '.'

async function fill(values: Record<string, string>) {
  for (const [label, value] of Object.entries(values)) {
    await userEvent.type(screen.getByLabelText(label), value)
  }
}

describe('RegisterForm', () => {
  it('requires every field', async () => {
    const onSubmit = vi.fn()
    render(<RegisterForm onSubmit={onSubmit} />)

    await userEvent.click(
      screen.getByRole('button', { name: /create account/i })
    )

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(
      screen.getByText('Password must be at least 8 characters')
    ).toBeInTheDocument()
    expect(screen.getByText('Please confirm your password')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('rejects passwords that do not match', async () => {
    const onSubmit = vi.fn()
    render(<RegisterForm onSubmit={onSubmit} />)

    await fill({
      Name: 'Jane',
      Email: 'jane@example.com',
      Password: 'pa55word-long',
      'Confirm password': 'something-else'
    })
    await userEvent.click(
      screen.getByRole('button', { name: /create account/i })
    )

    expect(
      await screen.findByText('Passwords do not match')
    ).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits a valid registration', async () => {
    const onSubmit = vi.fn()
    render(<RegisterForm onSubmit={onSubmit} />)

    await fill({
      Name: 'Jane',
      Email: 'jane@example.com',
      Password: 'pa55word-long',
      'Confirm password': 'pa55word-long'
    })
    await userEvent.click(
      screen.getByRole('button', { name: /create account/i })
    )

    expect(onSubmit).toHaveBeenCalledWith(
      {
        name: 'Jane',
        email: 'jane@example.com',
        password: 'pa55word-long',
        confirmPassword: 'pa55word-long'
      },
      expect.anything()
    )
  })

  it('shows the server error', () => {
    render(
      <RegisterForm
        onSubmit={vi.fn()}
        error="An account with this email already exists"
      />
    )

    expect(
      screen.getByText('An account with this email already exists')
    ).toBeInTheDocument()
  })
})
