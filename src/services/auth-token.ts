const ACCESS_TOKEN_KEY = 'auth.accessToken'
const REFRESH_TOKEN_KEY = 'auth.refreshToken'

// localStorage can throw (private mode, blocked storage), so every access is
// guarded and treated as "no token".
function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // ignore
  }
}

function remove(key: string) {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

export function getAccessToken() {
  return read(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return read(REFRESH_TOKEN_KEY)
}

export function setTokens(tokens: { access: string; refresh?: string }) {
  write(ACCESS_TOKEN_KEY, tokens.access)

  if (tokens.refresh !== undefined) {
    write(REFRESH_TOKEN_KEY, tokens.refresh)
  }
}

export function clearTokens() {
  remove(ACCESS_TOKEN_KEY)
  remove(REFRESH_TOKEN_KEY)
}
