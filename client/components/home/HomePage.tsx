import { useState } from 'react'
import ChatArea from './ChatArea'
import ThreadPanel from './ThreadsPanel'
import { useGlobalData } from '../../hooks/useGlobalData'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { globalData } = useGlobalData()

  const [showThreadPanel, setShowThreadPanel] = useState(false)
  const [showChatArea, setShowChatArea] = useState(true)
  const navigate = useNavigate()

  globalData?.auth.onAuthStateChanged((user) => {
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
