import { MainContainer } from '@/components'
import { AppNavbar } from '../app-navbar'
import { useAuth } from '@/features/auth/hooks'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

export function AppLayout() {
  const { saveToken, isTokenReady, isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      saveToken()
    }
  }, [isAuthenticated, saveToken])

  if (isAuthenticated && (isLoading || !isTokenReady)) {
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
