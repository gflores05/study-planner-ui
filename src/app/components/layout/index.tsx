import { MainContainer } from '@/components'
import { AppNavbar } from '../app-navbar'
import { useAuth } from '@/features/auth/hooks'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Outlet } from 'react-router'

export function AppLayout() {
  const { saveToken, isTokenReady } = useAuth()
  const { isAuthenticated, isLoading } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      saveToken()
    }
  }, [saveToken])

  if (isLoading || !isTokenReady) {
    return (
      <MainContainer>
        <h1>Loading authentication session...</h1>
      </MainContainer>
    )
  }
  return (
    <>
      <AppNavbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  )
}
