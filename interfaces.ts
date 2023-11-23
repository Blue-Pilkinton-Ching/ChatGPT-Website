import { User } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

export interface GlobalDataWrapper {
  globalData: GlobalData | undefined
  setGlobalData: (data: GlobalData) => void
}

export interface GlobalData {
  authInfo: { user: User; token: string; isSignedIn: boolean }
  db: Firestore
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
