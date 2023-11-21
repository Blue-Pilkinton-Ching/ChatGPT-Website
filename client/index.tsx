import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { GlobalContext } from './hooks/useGlobalContext.tsx'
import { useState } from 'react'
import { GlobalContextInfo } from '../interfaces.ts'

function App() {
  const [globalContextState, setGlobalContextState] =
    useState<GlobalContextInfo>()

  return (
    <GlobalContext.Provider
      value={{
        globalContext: globalContextState,
        setGlobalContext: setGlobalContextState,
      }}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  )
}

const router = createBrowserRouter(routes)
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(<App />)
})
