import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalStateContext } from '../hooks/useGlobalState'
import { GlobalRef, GlobalState } from '../../interfaces'
import routes from '../routes'
import { useState, useRef } from 'react'
import { initializeApp } from 'firebase/app'
import { GlobalRefContext } from '../hooks/useGlobalRef'

const router = createBrowserRouter(routes)

export function App() {
  const [globalState, setGlobalState] = useState<GlobalState>({
    insideNewChat: true,
  })
  const globalRef = useRef<GlobalRef>({
    settings: { apiKey: '' },
  })

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
    <GlobalRefContext.Provider value={globalRef}>
      <GlobalStateContext.Provider
        value={{
          globalState,
          setGlobalState,
        }}
      >
        <RouterProvider router={router} />
      </GlobalStateContext.Provider>
    </GlobalRefContext.Provider>
  )
}
