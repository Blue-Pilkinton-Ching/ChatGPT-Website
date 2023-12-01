import { useEffect, useState } from 'react'
import ChatArea from './conversation/ChatArea'
import ThreadPanel from './thread-panel/ThreadsPanel'
import { useGlobalData } from '../../hooks/useGlobalData'
import { User, getAuth } from 'firebase/auth'
import { Loader } from '../Loader'
import Settings from './Settings'

export default function HomePage() {
  const [showThreadPanel, setShowThreadPanel] = useState(false)
  const [showChatArea, setShowChatArea] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const { globalData, setGlobalData } = useGlobalData()
  const [currentUser, setCurrentUser] = useState<User | null>(
    getAuth().currentUser
  )

  useEffect(() => {
    setGlobalData({ ...globalData, insideNewChat: true })

    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setCurrentUser(user)
    })

    return () => unsubscribe()

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
      {currentUser ? (
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
      ) : (
        <Loader />
      )}
    </main>
  )
}
