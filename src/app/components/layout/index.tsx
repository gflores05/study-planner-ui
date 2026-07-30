import { MainContainer } from '@/components'
import { AppNavbar } from '../app-navbar'
import { useAuth } from '@/features/auth/hooks'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { saveToken } = useAuth()
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    if (isAuthenticated) {
      saveToken()
    }
  }, [saveToken])
  return (
    <>
      <AppNavbar />
      <MainContainer>{children}</MainContainer>
    </>
  )
}
