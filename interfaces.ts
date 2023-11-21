import { User } from 'firebase/auth'

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

export interface GlobalContextState {
  globalContext: GlobalContextInfo | undefined
  setGlobalContext: (context: GlobalContextInfo) => void
}

export interface GlobalContextInfo {
  authInfo: { user: User; token: string; isSignedIn: boolean }
}

export interface SignInButtonProps {
  text: string
  imgSrc: string
  bgColor: string
  textColor: string
  onClickCallback: () => void
}

export interface ChatAreaProps {
  onOpenThreadsPanel: () => void
}

export interface ThreadPanelProps {
  show: boolean
  onExitButton: () => void
}
