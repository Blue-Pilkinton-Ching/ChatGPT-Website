import { GoogleGenerativeAI } from '@google/generative-ai'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'
import { Dispatch, SetStateAction } from 'react'
export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

export interface GeminiMessage {
  role: string
  parts: string
}

export interface SignInWithEmailProps {
  onBack: () => void
  onSubmit: (email: string, password: string, creatingEmail: boolean) => void
  warning: string
}
export interface MessageProps {
  message: ChatCompletionMessageParam | GeminiMessage
  assistant: Assistant
}
export interface GlobalStateWrapper {
  globalState: GlobalState
  setGlobalState: Dispatch<SetStateAction<GlobalState>>
}
export interface ThreadOptionProps {
  thread: ThreadHeader
}

export interface ThreadHeader {
  name: string
  threadID: string
  lastEdited: number
}

export interface GlobalState {
  showThreadsPanel: boolean
  showSettingsPanel: boolean
  messageTextAreaHeight: string
  insideNewChat: boolean
  currentThread: Thread | null
  threadHeaders: ThreadHeader[]
  reachedFinalThreadHeader: boolean
}

export interface GlobalRef {
  settings: Settings
  openai: OpenAI
  googleai: GoogleGenerativeAI
  getMoreThreads: () => void
  latestDoc: null | QueryDocumentSnapshot<DocumentData, DocumentData>
  assistant: Assistant | null
  assistants: Assistant[]
}

export interface LoaderProps {
  text: string
}

export interface Settings {
  openAIAPIKey: string
  geminiProAPIKey: string
}

export interface Assistant {
  name: string
  id: string
  instructions: string | null
  model: string
  isDefault: boolean
  temperature?: number
  maxTokens?: number
  canDemo: boolean
}

export interface Thread {
  assistant: Assistant
  conversation: ChatCompletionMessageParam[] | GeminiMessage[]
  id: string
}

export interface SignInButtonProps {
  text: string
  imgSrc: string
  bgColor: string
  textColor: string
  onClickCallback: () => void
}

export interface ExitButtonProps {
  onClick: () => void
  classes?: string
}

export interface SettingsOptionProps {
  selected: boolean
  id: number
  icon: string
  text: string
  onClick: (id: number) => void
}

export interface SettingsContentProps {
  show: boolean
}
