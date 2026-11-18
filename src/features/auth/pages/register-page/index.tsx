import { useCallback, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useAuth } from '../../hooks'
import { AuthCard } from '../../components/auth-card'
import { RegisterForm } from '../../components/register-form'
import type { RegisterFormValues } from '../../schemas'

type LocationState = { from?: { pathname?: string } } | null

export function RegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, submitting, authError, register, resetAuthError } =
    useAuth()
  const returnTo = (location.state as LocationState)?.from?.pathname ?? '/'

  useEffect(() => {
    resetAuthError()
  }, [resetAuthError])

  const handleSubmit = useCallback(
    async (values: RegisterFormValues) => {
      try {
        const user = await register(values)
        toast.success(`Welcome, ${user.name}!`, { position: 'bottom-right' })
        navigate(returnTo, { replace: true })
      } catch {
        // The error is shown from the store.
      }
    },
    [register, navigate, returnTo]
  )

  if (isAuthenticated && !submitting) {
    return <Navigate to={returnTo} replace />
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Start building study plans tailored to you"
      footer={
        <span>
          Already have an account?{' '}
          <Link
            to="/login"
            state={location.state}
            className="font-medium text-indigo-600 hover:text-indigo-500">
            Log in
          </Link>
        </span>
      }>
      <RegisterForm
        onSubmit={handleSubmit}
        submitting={submitting}
        error={authError}
      />
    </AuthCard>
  )
}
