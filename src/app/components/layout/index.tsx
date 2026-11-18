import { MainContainer } from '@/components'
import { AppNavbar } from '../app-navbar'
import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <>
      <AppNavbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  )
}
