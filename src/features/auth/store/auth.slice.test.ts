import { afterEach, describe, expect, it, vi } from 'vitest'
import { makeStore } from '@/app/store'
import { getAccessToken, getRefreshToken, setTokens } from '@/services'
import { axiosHttpError } from '@/test/axios'
import { AuthService, UserService } from '../services'
import { login, register } from './auth.thunks'
import { logout } from './auth.slice'

const jane = { id: 'user-1', email: 'jane@example.com', name: 'Jane' }
const tokens = {
  access_token: 'access',
  refresh_token: 'refresh',
  token_type: 'bearer' as const
}

describe('auth store', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('starts logged out without a stored token', () => {
    expect(makeStore().getState().auth.isAuthenticated).toBe(false)
  })

  it('restores the session from a stored token', () => {
    setTokens({ access: 'access', refresh: 'refresh' })

    expect(makeStore().getState().auth.isAuthenticated).toBe(true)
  })

  it('logs in, stores the tokens and loads the user', async () => {
    const loginSpy = vi.spyOn(AuthService, 'login').mockResolvedValue(tokens)
    vi.spyOn(UserService, 'get').mockResolvedValue(jane)
    const store = makeStore()

    await store.dispatch(
      login({ email: ' jane@example.com ', password: 'secret' })
    )

    expect(loginSpy).toHaveBeenCalledWith({
      email: 'jane@example.com',
      password: 'secret'
    })
    expect(getAccessToken()).toBe('access')
    expect(getRefreshToken()).toBe('refresh')
    expect(store.getState().auth).toMatchObject({
      isAuthenticated: true,
      current: jane,
      submitting: false,
      authError: null
    })
  })

  it('reports invalid credentials', async () => {
    vi.spyOn(AuthService, 'login').mockRejectedValue(
      axiosHttpError(401, { error: 'UserInvalidCredentials' })
    )
    const store = makeStore()

    await store.dispatch(login({ email: 'jane@example.com', password: 'bad' }))

    expect(getAccessToken()).toBeNull()
    expect(store.getState().auth).toMatchObject({
      isAuthenticated: false,
      authError: 'Invalid email or password'
    })
  })

  it('registers and logs the new user in', async () => {
    const registerSpy = vi
      .spyOn(AuthService, 'register')
      .mockResolvedValue({ id: jane.id })
    vi.spyOn(AuthService, 'login').mockResolvedValue(tokens)
    vi.spyOn(UserService, 'get').mockResolvedValue(jane)
    const store = makeStore()

    await store.dispatch(
      register({
        name: ' Jane ',
        email: 'jane@example.com',
        password: 'pa55word-long',
        confirmPassword: 'pa55word-long'
      })
    )

    expect(registerSpy).toHaveBeenCalledWith({
      name: 'Jane',
      email: 'jane@example.com',
      password: 'pa55word-long'
    })
    expect(store.getState().auth).toMatchObject({
      isAuthenticated: true,
      current: jane
    })
    expect(getAccessToken()).toBe('access')
  })

  it('reports an already registered email', async () => {
    vi.spyOn(AuthService, 'register').mockRejectedValue(
      axiosHttpError(409, { error: 'UserAlreadyExists' })
    )
    const loginSpy = vi.spyOn(AuthService, 'login')
    const store = makeStore()

    await store.dispatch(
      register({
        name: 'Jane',
        email: 'jane@example.com',
        password: 'pa55word-long',
        confirmPassword: 'pa55word-long'
      })
    )

    expect(loginSpy).not.toHaveBeenCalled()
    expect(store.getState().auth.authError).toBe(
      'An account with this email already exists'
    )
  })

  it('resets every slice on logout', async () => {
    vi.spyOn(AuthService, 'login').mockResolvedValue(tokens)
    vi.spyOn(UserService, 'get').mockResolvedValue(jane)
    const store = makeStore()
    await store.dispatch(login({ email: 'jane@example.com', password: 'x' }))
    const pristine = makeStore().getState()

    localStorage.clear()
    store.dispatch(logout())

    expect(store.getState()).toEqual({
      ...pristine,
      auth: { ...pristine.auth, isAuthenticated: false }
    })
  })
})
