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
  insideNewChat: boolean
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
  id: number
  icon: string
  text: string
  onClick: (id: number) => void
}
