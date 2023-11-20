export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
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
