import { useState } from 'react'
import ChatArea from './ChatArea'
import ThreadPanel from './ThreadsPanel'

export default function HomePage() {
  const [showThreadPanel, setShowThreadPanel] = useState(false)

  function onOpenThreadsPanel() {
    setShowThreadPanel(true)
  }

  function onExitThreadsPanel() {
    setShowThreadPanel(false)
  }

  return (
    <>
      <ThreadPanel show={showThreadPanel} onExitButton={onExitThreadsPanel} />
      <ChatArea onOpenThreadsPanel={onOpenThreadsPanel} />
    </>
  )
}
