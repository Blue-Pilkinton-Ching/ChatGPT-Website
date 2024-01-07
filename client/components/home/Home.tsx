import { useEffect } from 'react'
import MainArea from './conversation/MainArea'
import ThreadPanel from './thread-panel/ThreadsPanel'
import { useGlobalState } from '../../hooks/useGlobalState'
import Settings from './settings/Settings'

export default function Home() {
  const { setGlobalState } = useGlobalState()

  useEffect(() => {
    setGlobalState((oldState) => ({ ...oldState, insideNewChat: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="home">
      <>
        <ThreadPanel />
        <MainArea />
        <Settings />
      </>
    </main>
  )
}
