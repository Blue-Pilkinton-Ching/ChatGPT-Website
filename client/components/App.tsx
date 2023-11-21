import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalContext } from '../hooks/useGlobalData'
import { GlobalData } from '../../interfaces'
import routes from '../routes'
import { useState } from 'react'

const router = createBrowserRouter(routes)

export function App() {
  const [globalData, setGlobalData] = useState<GlobalData>()

  return (
    <GlobalContext.Provider
      value={{
        globalData,
        setGlobalData,
      }}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  )
}
