import axios, { isAxiosError, type InternalAxiosRequestConfig } from 'axios'
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens
} from './auth-token'

const baseURL = import.meta.env.VITE_API_URL

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

let onUnauthorized: () => void = () => {}

/** Called when the session can't be recovered (refresh failed or missing). */
export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

apiClient.interceptors.request.use(config => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Concurrent 401s share a single refresh request.
let refreshPromise: Promise<string> | null = null

function refreshAccessToken(refreshToken: string): Promise<string> {
  refreshPromise ??= axios
    .post<{ access_token: string }>(
      `${baseURL}/v1/auth/refresh`,
      { refresh_token: refreshToken },
      { adapter: apiClient.defaults.adapter }
    )
    .then(response => {
      setTokens({ access: response.data.access_token })
      return response.data.access_token
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean }

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const config = (isAxiosError(error) ? error.config : undefined) as
      RetriableConfig | undefined
    const isAuthRoute = config?.url?.startsWith('/v1/auth/') ?? false
    // Only an invalid/expired token ends the session; other 401s (e.g. a wrong
    // current password) are passed to the caller.
    const isTokenError =
      isAxiosError(error) &&
      error.response?.status === 401 &&
      (error.response.data as { error?: string } | undefined)?.error ===
        'UserInvalidToken'

    if (!isTokenError || !config || isAuthRoute) {
      return Promise.reject(error)
    }

    const refreshToken = getRefreshToken()

    if (!config._retry && refreshToken) {
      config._retry = true

      try {
        const accessToken = await refreshAccessToken(refreshToken)
        config.headers.Authorization = `Bearer ${accessToken}`

        return apiClient(config)
      } catch {
        // The session is over, fall through.
      }
    }

    clearTokens()
    onUnauthorized()

    return Promise.reject(error)
  }
)
