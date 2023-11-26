import { useState } from 'react'
import ChatArea from './ChatArea'
import ThreadPanel from './ThreadsPanel'

export default function HomePage() {
  const [showThreadPanel, setShowThreadPanel] = useState(false)
  const [showChatArea, setShowChatArea] = useState(true)

  function onOpenThreadsPanel() {
    setShowChatArea(false)
    setShowThreadPanel(true)
  }

  function onExitThreadsPanel() {
    setShowChatArea(true)
    setShowThreadPanel(false)
  }

  return (
    <>
      <ThreadPanel show={showThreadPanel} onExitButton={onExitThreadsPanel} />
      <ChatArea show={showChatArea} onOpenThreadsPanel={onOpenThreadsPanel} />
    </>
  )
}
