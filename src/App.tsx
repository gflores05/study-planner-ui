import './App.css'
import { AppRouter } from './app/router'
import { Toaster } from './components/ui/sonner'
import { useAuth0 } from '@auth0/auth0-react'
import { Spinner } from './components/ui/spinner'
import { MainContainer } from './components'

function App() {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return (
      <MainContainer>
        <Spinner />
      </MainContainer>
    )
  }

  return (
    <>
      <Toaster /> <AppRouter />
    </>
  )
}

export default App
