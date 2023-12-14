import { ChangeEvent, KeyboardEvent } from 'react'
import NewChatPage from './NewChatPage'
import { useGlobalData } from '../../../hooks/useGlobalState'

export function MessageArea() {
  const { globalState, setGlobalState } = useGlobalData()

  function onMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = 'auto'
    event.target.style.height =
      Math.min(event.target.scrollHeight - 30, 150) + 'px'
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      console.log('Submit Message')
      if (globalState.insideNewChat) {
        // New Chat
        setGlobalState({ ...globalState, insideNewChat: false })
      } else {
        // Existing Chat
      }
    }
  }

  return (
    <div className="message-area">
      {globalState.insideNewChat ? <NewChatPage /> : ''}
      <textarea
        onKeyDown={onKeyDown}
        onChange={onMessageChange}
        className="message-text-field text"
        name="message-text-field"
        placeholder="Message GPT..."
        rows={1}
      ></textarea>
    </div>
  )
}
