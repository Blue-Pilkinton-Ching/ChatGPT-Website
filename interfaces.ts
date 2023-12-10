export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
  measurementId: string
}

export interface GlobalStateWrapper {
  globalState: GlobalState
  setGlobalState: (data: GlobalState) => void
}

export interface GlobalState {
  insideNewChat: boolean
}

export interface GlobalRef {
  settings: Settings
}

export interface Settings {
  apiKey: string
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
