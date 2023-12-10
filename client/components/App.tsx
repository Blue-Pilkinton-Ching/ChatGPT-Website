import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalContext } from '../hooks/useGlobalData'
import { GlobalData } from '../../interfaces'
import routes from '../routes'
import { useEffect, useState } from 'react'
import EventEmitter from 'events'

const router = createBrowserRouter(routes)

export const onGlobalData = new EventEmitter()

export function App() {
  const [globalState, setGlobalState] = useState<GlobalData>({
    insideNewChat: true,
    settings: { apiKey: '' },
  })

  useEffect(() => {
    onGlobalData.emit('changed')
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        globalData: globalState,
        setGlobalData: (data) => {
          setGlobalState(data)
          onGlobalData.emit('changed')
        },
      }}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  )
}
