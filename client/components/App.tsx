import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalContext } from '../hooks/useGlobalData'
import { GlobalData } from '../../interfaces'
import routes from '../routes'
import { useEffect, useState } from 'react'
import EventEmitter from 'events'
import { initializeApp } from 'firebase/app'

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

  initializeApp({
    apiKey: 'AIzaSyB4enbUPLq5f3CJnoGSiNIoxV-MLmlAuVQ',
    authDomain: 'chatgpt-website-c81b2.firebaseapp.com',
    projectId: 'chatgpt-website-c81b2',
    storageBucket: 'chatgpt-website-c81b2.appspot.com',
    messagingSenderId: '348741570396',
    appId: '1:348741570396:web:dfd779c008b66a00e3fb99',
    measurementId: 'G-9KW9PBHY99',
  })

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
