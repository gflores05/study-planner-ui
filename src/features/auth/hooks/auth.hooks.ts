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
  const user = useAppSelector(selectCurrentUser)
  const loading = useAppSelector(selectUserLoading)
  const error = useAppSelector(selectUserError)
  const token = useAppSelector(selectToken)
  const { getAccessTokenSilently } = useAuth0()

  const isTokenReady = useMemo(() => Boolean(token), [token])

  const saveToken = useCallback(async () => {
    const accessToken = await getAccessTokenSilently()

    dispatch(setToken(accessToken))
  }, [getAccessTokenSilently])

  const fetchUser = useCallback(() => {
    dispatch(getUser({}))
  }, [getUser])

  return { user, loading, error, fetchUser, saveToken, isTokenReady }
}
