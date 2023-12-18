import { useEffect, useState } from 'react'
import ChatArea from './conversation/MainArea'
import ThreadPanel from './thread-panel/ThreadsPanel'
import { useGlobalState } from '../../hooks/useGlobalState'
import Settings from './settings/Settings'

export default function Home() {
  const [showThreadPanel, setShowThreadPanel] = useState(false)
  const [showChatArea, setShowChatArea] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const { setGlobalState } = useGlobalState()

  useEffect(() => {
    setGlobalState((oldState) => ({ ...oldState, insideNewChat: true }))
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
