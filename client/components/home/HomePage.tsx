import { useState } from 'react'
import ChatArea from './ChatArea'
import ThreadPanel from './ThreadsPanel'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

export default function HomePage() {
  const [showThreadPanel, setShowThreadPanel] = useState(false)
  const [showChatArea, setShowChatArea] = useState(true)
  const navigate = useNavigate()
  const auth = getAuth()

  auth.onAuthStateChanged((user) => {
    if (!user) {
      console.log('Rerouting')
      navigate('/')
    }
  })

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
