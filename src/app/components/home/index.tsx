import { Content } from '@/components'
import { Button } from '@/components/ui/button'
import { LoginButton, SignupButton } from '../app-navbar'
import { Link } from 'react-router'
import { useAuth } from '@/features/auth'

export function Home() {
  const { isAuthenticated } = useAuth()

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
          <div className="flex gap-4">
            <LoginButton />
            <SignupButton />
          </div>
        )}
      </div>
    </Content>
  )
}
