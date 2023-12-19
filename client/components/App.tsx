import { GlobalStateContext } from '../hooks/useGlobalState'
import { GlobalRef, GlobalState } from '../../interfaces'
import { useRef, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { GlobalRefContext } from '../hooks/useGlobalRef'
import Controller from './Controller'
import OpenAI from 'openai'

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
    currentThread: null,
    messageTextAreaHeight: '',
    threadHeaders: [],
  })
  const ref = useRef<GlobalRef>({
    settings: { apiKey: '', assistants: [] },
    openai: new OpenAI({
      apiKey: 'PLACEHOLDER',
      dangerouslyAllowBrowser: true,
    }),
    showMoreThreads: () => {},
    latestDoc: null,
  })

  return (
    <GlobalRefContext.Provider value={ref.current}>
      <GlobalStateContext.Provider
        value={{
          globalState,
          setGlobalState,
        }}
      >
        <Controller />
      </GlobalStateContext.Provider>
    </GlobalRefContext.Provider>
  )
}
