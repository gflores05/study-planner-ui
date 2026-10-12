import { Content } from '@/components'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { LoginButton } from '../app-navbar'
import { Link } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

export function Home() {
  const { isAuthenticated, error } = useAuth0()

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Content alignContent="center">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl">
          The machines are learning, but what about you?
        </h1>
        {isAuthenticated ? (
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<Link to="start" />}>
            Start
          </Button>
        ) : (
          <LoginButton size="lg" />
        )}
      </div>
    </Content>
  )
}
