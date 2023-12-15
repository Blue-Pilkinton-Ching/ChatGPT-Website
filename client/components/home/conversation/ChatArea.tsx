import { FormEvent } from 'react'
import { ChatAreaProps } from '../../../../interfaces.ts'
import { MessageArea } from './MessageArea.tsx'
import { Conversation } from './Conversation.tsx'
import { useGlobalState } from '../../../hooks/useGlobalState.tsx'

export default function ChatArea(props: ChatAreaProps) {
  const { globalState } = useGlobalState()

  function openThreadsPanel(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    props.openThreadsPanel()
  }

  function openSettings(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    props.showSettingsPanel()
  }

  return (
    <>
      <div className="chat-area">
        {globalState.insideNewChat ? '' : <Conversation />}
        {props.showPanelThreadsButton ? (
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
                src="images/settings.svg"
                alt="settings"
                className="settings-svg"
              />
            </button>
          </>
        ) : (
          ''
        )}
        <MessageArea />
      </div>
    </>
  )
}
