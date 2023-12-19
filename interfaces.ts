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

export interface MessageProps {
  message: ChatCompletionMessageParam
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
  messageTextAreaHeight: string
  insideNewChat: boolean
  currentThread: Thread | null
  threadHeaders: ThreadHeader[]
}

export interface GlobalRef {
  settings: Settings
  openai: OpenAI
}

export interface LoaderProps {
  text: string
}

export interface Settings {
  apiKey: string
  assistants: Assistant[]
}

export interface Assistant {
  name: string
  id: string
  instructions: string | null
  model: string
  isDefault: boolean
  temperature?: number
  maxTokens?: number
}

export interface Thread {
  assistant: Assistant
  conversation: ChatCompletionMessageParam[]
  id: string
}

export interface SignInButtonProps {
  text: string
  imgSrc: string
  bgColor: string
  textColor: string
  onClickCallback: () => void
}

export interface ChatAreaProps {
  chatStarted: boolean
  showPanelThreadsButton: boolean
  showSettingsPanel: () => void
  openThreadsPanel: () => void
}

export interface SettingsProps {
  show: boolean
  onExitButton: () => void
}

export interface ExitButtonProps {
  onClick: () => void
}

export interface ThreadPanelProps {
  show: boolean
  onExitButton: () => void
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
