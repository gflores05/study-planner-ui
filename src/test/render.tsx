import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router'
import { makeStore } from '@/app/store'
import { LocationDisplay } from './location-display'

interface RenderWithAppOptions {
  path: string
  initialEntries: Parameters<typeof MemoryRouter>[0]['initialEntries']
  store?: ReturnType<typeof makeStore>
  extraRoutes?: ReactElement[]
}

export function renderWithApp(
  element: ReactElement,
  {
    path,
    initialEntries,
    store = makeStore(),
    extraRoutes = []
  }: RenderWithAppOptions
) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path={path} element={element} />
            {extraRoutes}
            <Route path="*" element={<LocationDisplay />} />
          </Routes>
          <LocationDisplay />
        </MemoryRouter>
      </Provider>
    )
  }
}
