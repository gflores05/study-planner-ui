import { useLocation } from 'react-router'

/** Shows the current path so tests can assert on redirects. */
export function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location">{location.pathname}</div>
}
