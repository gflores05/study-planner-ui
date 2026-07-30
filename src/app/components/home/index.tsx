import { Button, Content, ErrorMessage } from '@/components'
import { LoginButton } from '../app-navbar'
import { Link } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import { AppLayout } from '../layout'

export function Home() {
  const { isAuthenticated, error } = useAuth0()

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  return (
    <AppLayout>
      <Content alignContent="center">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl">
            The machines are learning, but what about you?
          </h1>
          {isAuthenticated ? (
            <Button>
              <Link to="start">Start</Link>
            </Button>
          ) : (
            <LoginButton size="large" />
          )}
        </div>
      </Content>
    </AppLayout>
  )
}
