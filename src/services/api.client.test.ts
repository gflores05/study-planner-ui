import type { InternalAxiosRequestConfig } from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient, setUnauthorizedHandler } from './api.client'
import { getAccessToken, getRefreshToken, setTokens } from './auth-token'
import { axiosHttpError, axiosResponse } from '@/test/axios'

type Handler = (config: InternalAxiosRequestConfig) => Promise<unknown>

const originalAdapter = apiClient.defaults.adapter
const invalidToken = { error: 'UserInvalidToken', message: 'UserInvalidToken' }

describe('apiClient', () => {
  let requests: InternalAxiosRequestConfig[]
  let onUnauthorized: ReturnType<typeof vi.fn<() => void>>

  function stub(handler: Handler) {
    apiClient.defaults.adapter = config => {
      requests.push(config)
      return handler(config) as never
    }
  }

  beforeEach(() => {
    requests = []
    onUnauthorized = vi.fn<() => void>()
    setUnauthorizedHandler(onUnauthorized)
  })

  afterEach(() => {
    apiClient.defaults.adapter = originalAdapter
  })

  it('sends the access token as a bearer token', async () => {
    setTokens({ access: 'access-1', refresh: 'refresh-1' })
    stub(async config => axiosResponse(200, {}, config))

    await apiClient.get('/v1/user/me')

    expect(requests[0].headers.Authorization).toBe('Bearer access-1')
  })

  it('sends no authorization header without a token', async () => {
    stub(async config => axiosResponse(200, {}, config))

    await apiClient.get('/v1/user/me')

    expect(requests[0].headers.Authorization).toBeUndefined()
  })

  it('refreshes the access token once and retries on an invalid token', async () => {
    setTokens({ access: 'expired', refresh: 'refresh-1' })
    stub(async config => {
      if (config.url?.endsWith('/v1/auth/refresh')) {
        expect(JSON.parse(config.data)).toEqual({ refresh_token: 'refresh-1' })
        return axiosResponse(200, { access_token: 'access-2' }, config)
      }
      if (config.headers.Authorization === 'Bearer expired') {
        throw axiosHttpError(401, invalidToken, config)
      }
      return axiosResponse(200, { ok: true }, config)
    })

    const [first, second] = await Promise.all([
      apiClient.get('/v1/study-plan/1'),
      apiClient.get('/v1/study-plan/2')
    ])

    expect(first.data).toEqual({ ok: true })
    expect(second.data).toEqual({ ok: true })
    expect(
      requests.filter(r => r.url?.endsWith('/v1/auth/refresh'))
    ).toHaveLength(1)
    expect(getAccessToken()).toBe('access-2')
    expect(getRefreshToken()).toBe('refresh-1')
    expect(onUnauthorized).not.toHaveBeenCalled()
  })

  it('ends the session when the refresh fails', async () => {
    setTokens({ access: 'expired', refresh: 'expired-refresh' })
    stub(async config => {
      throw axiosHttpError(401, invalidToken, config)
    })

    await expect(apiClient.get('/v1/study-plan/1')).rejects.toMatchObject({
      response: { status: 401 }
    })

    expect(getAccessToken()).toBeNull()
    expect(getRefreshToken()).toBeNull()
    expect(onUnauthorized).toHaveBeenCalledTimes(1)
  })

  it('does not end the session for other 401 errors', async () => {
    setTokens({ access: 'access-1', refresh: 'refresh-1' })
    stub(async config => {
      throw axiosHttpError(401, { error: 'UserInvalidCredentials' }, config)
    })

    await expect(apiClient.put('/v1/user/me/password', {})).rejects.toBeTruthy()

    expect(getAccessToken()).toBe('access-1')
    expect(onUnauthorized).not.toHaveBeenCalled()
  })

  it('does not try to refresh on auth routes', async () => {
    stub(async config => {
      throw axiosHttpError(401, invalidToken, config)
    })

    await expect(
      apiClient.post('/v1/auth/login', { email: 'a', password: 'b' })
    ).rejects.toBeTruthy()

    expect(requests).toHaveLength(1)
    expect(onUnauthorized).not.toHaveBeenCalled()
  })
})
