import { GlobalStateContext } from '../hooks/useGlobalState'
import { GlobalRef, GlobalState } from '../../interfaces'
import { useRef, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { GlobalRefContext } from '../hooks/useGlobalRef'
import Controller from './Controller'
import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

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
    reachedFinalThreadHeader: false,
    showThreadsPanel: false,
    showSettingsPanel: false,
    triggers: {
      downloadedSettings: false,
    },
  })

  const ref = useRef<GlobalRef>({
    settings: { openAIAPIKey: '', geminiProAPIKey: '' },
    openai: new OpenAI({
      apiKey: 'PLACEHOLDER',
      dangerouslyAllowBrowser: true,
    }),
    googleai: new GoogleGenerativeAI(''),
    getMoreThreads: () => {},
    latestDoc: null,
    assistant: null,
    assistants: [
      {
        id: 'gpt3',
        name: 'GPT-3.5 Turbo',
        instructions: null,
        model: 'gpt-3.5-turbo',
        isDefault: false,
        maxTokens: 1500,
        canDemo: true,
      },
      {
        id: 'gpt4',
        name: 'GPT-4 Turbo',
        instructions: null,
        model: 'gpt-4-turbo-preview',
        isDefault: true,
        maxTokens: 1500,
        canDemo: false,
      },
      {
        id: 'header',
        name: 'Header Generator',
        instructions:
          'Create a concise, neutral topic header summarizing the following text sent by the user. It must be under five words, and without periods, quotes, or embellishments, and avoid providing specific detail or answers.',
        model: 'gpt-3.5-turbo',
        isDefault: false,
        temperature: 0,
        maxTokens: 15,
        canDemo: false,
      },
      {
        id: 'gemini-pro',
        name: 'Gemini Pro',
        instructions: '',
        model: 'gemini-pro',
        isDefault: false,
        temperature: 0,
        maxTokens: 1500,
        canDemo: true,
      },
    ],
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
