import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { GlobalStateContext } from '../hooks/useGlobalState'
import { GlobalState } from '../../interfaces'
import routes from '../routes'
import { useState, useRef } from 'react'
import { initializeApp } from 'firebase/app'
import {
  FireStoreDataContext,
  useFirestoreData,
} from '../hooks/useFirestoreData'

const router = createBrowserRouter(routes)
initializeApp({
  apiKey: 'AIzaSyB4enbUPLq5f3CJnoGSiNIoxV-MLmlAuVQ',
  authDomain: 'chatgpt-website-c81b2.firebaseapp.com',
  projectId: 'chatgpt-website-c81b2',
  storageBucket: 'chatgpt-website-c81b2.appspot.com',
  messagingSenderId: '348741570396',
  appId: '1:348741570396:web:dfd779c008b66a00e3fb99',
  measurementId: 'G-9KW9PBHY99',
})

export function App() {
  const [globalState, setGlobalState] = useState<GlobalState>({
    insideNewChat: true,
  })
  const fsData = useFirestoreData()

  return (
    <GlobalStateContext.Provider
      value={{
        globalState,
        setGlobalState,
      }}
    >
      <FireStoreDataContext.Provider value={fsData}>
        <RouterProvider router={router} />
      </FireStoreDataContext.Provider>
    </GlobalStateContext.Provider>
  )
}
