import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  getUser,
  setToken,
  selectUserError,
  selectUserLoading,
  selectCurrentUser,
  selectToken
} from '../store'
import { useCallback, useMemo } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export function useAuth() {
  const dispatch = useAppDispatch()
  const {
    isLoading,
    isAuthenticated,
    logout,
    loginWithRedirect,
    getAccessTokenSilently
  } = useAuth0()
  const user = useAppSelector(selectCurrentUser)
  const loading = useAppSelector(selectUserLoading)
  const error = useAppSelector(selectUserError)
  const token = useAppSelector(selectToken)

  const isTokenReady = useMemo(() => Boolean(token), [token])

  const saveToken = useCallback(async () => {
    try {
      const accessToken = await getAccessTokenSilently()

      dispatch(setToken(accessToken))
    } catch (error) {
      await logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      })
    }
  }, [getAccessTokenSilently])

  const handleLogout = useCallback(() => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    })
  }, [logout])

  const handleLogin = useCallback(async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/'
      },
      authorizationParams: {
        prompt: 'login'
      }
    })
  }, [loginWithRedirect])

  const handleSignUp = useCallback(async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/'
      },
      authorizationParams: {
        prompt: 'login',
        screen_hint: 'signup'
      }
    })
  }, [loginWithRedirect])

  const fetchUser = useCallback(() => {
    dispatch(getUser({}))
  }, [getUser])

  return {
    user,
    isUserLoading: loading,
    error,
    isTokenReady,
    isLoading,
    isAuthenticated,
    fetchUser,
    saveToken,
    handleLogout,
    handleLogin,
    handleSignUp
  }
}
