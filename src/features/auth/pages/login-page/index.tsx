import { useCallback, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { useAuth } from '../../hooks'
import { AuthCard } from '../../components/auth-card'
import { LoginForm } from '../../components/login-form'
import type { LoginFormValues } from '../../schemas'

type LocationState = { from?: { pathname?: string } } | null

/** Entry screen: log in, or go create an account. */
export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, submitting, authError, login, resetAuthError } =
    useAuth()
  const returnTo = (location.state as LocationState)?.from?.pathname ?? '/'

  useEffect(() => {
    resetAuthError()
  }, [resetAuthError])

  const handleSubmit = useCallback(
    async (values: LoginFormValues) => {
      try {
        await login(values)
        navigate(returnTo, { replace: true })
      } catch {
        // The error is shown from the store.
      }
    },
    [login, navigate, returnTo]
  )

  if (isAuthenticated && !submitting) {
    return <Navigate to={returnTo} replace />
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to continue with your study plans"
      footer={
        <div className="flex flex-col items-center gap-3">
          <span>New to HumanLearning?</span>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            nativeButton={false}
            render={<Link to="/register" state={location.state} />}>
            Create an account
          </Button>
        </div>
      }>
      <LoginForm
        onSubmit={handleSubmit}
        submitting={submitting}
        error={authError}
      />
    </AuthCard>
  )
}
