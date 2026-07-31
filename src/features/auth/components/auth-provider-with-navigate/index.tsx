import { useNavigate } from 'react-router'
import { Auth0Provider, type AppState } from '@auth0/auth0-react'

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode
}

export function Auth0ProviderWithNavigate({
  children
}: Auth0ProviderWithNavigateProps) {
  const navigate = useNavigate()

  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  if (!(domain && clientId && redirectUri && audience)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri
      }}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens
      cacheLocation="localstorage">
      {children}
    </Auth0Provider>
  )
}
