import { MainContainer } from '@/components'
import { Spinner } from '@/components/ui/spinner'
import { withAuthenticationRequired } from '@auth0/auth0-react'

interface AuthenticationGuardProps {
  component: React.ComponentType<object>
}

export function AuthenticationGuard({ component }: AuthenticationGuardProps) {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <MainContainer>
        <Spinner />
      </MainContainer>
    )
  })

  return <Component />
}
