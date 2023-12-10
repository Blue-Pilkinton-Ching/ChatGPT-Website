import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalContext } from '../hooks/useGlobalData'
import { GlobalData } from '../../interfaces'
import routes from '../routes'
import { useEffect, useRef } from 'react'
import EventEmitter from 'events'

const router = createBrowserRouter(routes)

export const onGlobalStateChanged = new EventEmitter()

export function App() {
  const globalData = useRef<GlobalData>({
    insideNewChat: true,
    settings: { apiKey: '' },
  })

  useEffect(() => {
    onGlobalStateChanged.emit('changed')
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        globalData: globalData.current,
      }}
    >
      <RouterProvider router={router} />
    </GlobalContext.Provider>
  )
}
