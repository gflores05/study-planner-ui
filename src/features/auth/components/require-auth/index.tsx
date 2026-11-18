import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../../hooks'

/** Layout route that only renders its children for a logged-in user. */
export function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
