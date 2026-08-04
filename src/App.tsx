import './App.css'
import { AppRouter } from './app/router'
import { Toaster } from './components/ui/sonner'
import { Spinner } from './components/ui/spinner'
import { MainContainer } from './components'
import { useAuth } from './features/auth/hooks'

function App() {
  const { isLoading } = useAuth()

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
