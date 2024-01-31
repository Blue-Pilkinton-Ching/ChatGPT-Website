import { FormEvent } from 'react'
import { MessageArea } from './MessageArea.tsx'
import { useGlobalState } from '../../../hooks/useGlobalState.tsx'

export default function MainArea() {
  const { globalState, setGlobalState } = useGlobalState()

  function openThreadsPanel(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    setGlobalState((oldState) => ({ ...oldState, showThreadsPanel: true }))
  }

  function openSettings(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    setGlobalState((oldState) => ({ ...oldState, showSettingsPanel: true }))
  }

  return (
    <>
      <div className="chat-area">
        {globalState.showThreadsPanel ? (
          ''
        ) : (
          <>
            <button
              onClick={openThreadsPanel}
              className="show-threads-panel button"
            >
              <div className="bar1 bar"></div>
              <div className="bar2 bar"></div>
              <div className="bar3 bar"></div>
            </button>
            <button onClick={openSettings} className="settings button">
              <img
                src="/images/settings.svg"
                alt="settings"
                className="settings-svg"
              />
            </button>
          </>
        )}
        <MessageArea />
      </div>
    </>
  )
}
