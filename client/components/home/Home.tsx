import { useEffect, useState } from 'react'
import ChatArea from './conversation/ChatArea'
import ThreadPanel from './thread-panel/ThreadsPanel'
import { useGlobalData } from '../../hooks/useGlobalState'
import { useDocument } from 'react-firebase-hooks/firestore'
import { doc, getFirestore } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { useGlobalRef } from '../../hooks/useGlobalRef'
import { Settings as SettingsInterface } from '../../../interfaces'
import Settings from './settings/Settings'

export default function Home() {
  const [showThreadPanel, setShowThreadPanel] = useState(false)
  const [showChatArea, setShowChatArea] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const { globalState, setGlobalState } = useGlobalData()
  const globalRef = useGlobalRef()
  const [user] = useAuthState(getAuth())

  const [value] = useDocument(doc(getFirestore(), `settings/${user?.uid}`))

  useEffect(() => {
    const settings = value?.data() as SettingsInterface
    globalRef.settings = settings
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    setGlobalState({ ...globalState, insideNewChat: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function triggerThreadsPanel() {
    setShowChatArea(!showChatArea)
    setShowThreadPanel(!showThreadPanel)
  }

  function triggerSettingsPanel() {
    setShowSettings(!showSettings)
  }

  return (
    <main className="home">
      <>
        <ThreadPanel
          show={showThreadPanel}
          onExitButton={triggerThreadsPanel}
        />
        <ChatArea
          chatStarted={false}
          showPanelThreadsButton={showChatArea}
          openThreadsPanel={triggerThreadsPanel}
          showSettingsPanel={triggerSettingsPanel}
        />
        <Settings show={showSettings} onExitButton={triggerSettingsPanel} />
      </>
    </main>
  )
}
