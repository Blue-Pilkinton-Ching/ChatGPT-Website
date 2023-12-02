import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalContext } from '../hooks/useGlobalData'
import { GlobalData } from '../../interfaces'
import routes from '../routes'
import { useState } from 'react'

const router = createBrowserRouter(routes)

export function App() {
  const [globalState, setGlobalState] = useState<GlobalData>({
    insideNewChat: true,
    settingsData: { onSave: [], onCancel: [], settings: { apiKey: '' } },
  })

  return (
    <GlobalContext.Provider
      value={{
        globalData: globalState,
        setGlobalData: setGlobalState,
      }}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  )
}
