import { useEffect, useState } from 'react'
import ChatArea from './ChatArea'
import ThreadPanel from './ThreadsPanel'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useGlobalData } from '../../hooks/useGlobalData'

export default function HomePage() {
  const [showThreadPanel, setShowThreadPanel] = useState(false)
  const [showChatArea, setShowChatArea] = useState(true)
  const navigate = useNavigate()
  const auth = getAuth()
  const { globalData, setGlobalData } = useGlobalData()

  useEffect(() => {
    setGlobalData({ ...globalData, insideNewChat: true })
    auth.onAuthStateChanged((user) => {
      console.log('Auth state changed')
      if (!user) {
        console.log('Rerouting')
        navigate('/')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <ChatArea
        chatStarted={false}
        showPanelThreadsButton={showChatArea}
        onOpenThreadsPanel={onOpenThreadsPanel}
      />
    </>
  )
}
