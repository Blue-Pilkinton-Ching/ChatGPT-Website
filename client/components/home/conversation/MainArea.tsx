import { FormEvent } from 'react'
import { ChatAreaProps } from '../../../../interfaces.ts'
import { MessageArea } from './MessageArea.tsx'

export default function ChatArea(props: ChatAreaProps) {
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
