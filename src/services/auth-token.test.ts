import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens
} from './auth-token'

describe('auth-token', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('stores and reads both tokens', () => {
    setTokens({ access: 'access', refresh: 'refresh' })

    expect(getAccessToken()).toBe('access')
    expect(getRefreshToken()).toBe('refresh')
  })

  it('keeps the refresh token when only the access token changes', () => {
    setTokens({ access: 'access', refresh: 'refresh' })
    setTokens({ access: 'new-access' })

    expect(getAccessToken()).toBe('new-access')
    expect(getRefreshToken()).toBe('refresh')
  })

  it('clears the tokens', () => {
    setTokens({ access: 'access', refresh: 'refresh' })
    clearTokens()

    expect(getAccessToken()).toBeNull()
    expect(getRefreshToken()).toBeNull()
  })

  it('treats unavailable storage as no token', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })

    expect(() => setTokens({ access: 'access' })).not.toThrow()
    expect(getAccessToken()).toBeNull()
  })
})
