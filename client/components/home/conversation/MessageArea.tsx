import { ChangeEvent, FormEvent, KeyboardEvent } from 'react'
import NewChatPage from './NewChatPage'
import { useGlobalData } from '../../../hooks/useGlobalData'

export function MessageArea() {
  const { globalData } = useGlobalData()

  if (globalData == null) {
    return ''
  }

  function onMessageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function onMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = 'auto'
    event.target.style.height =
      Math.min(event.target.scrollHeight - 30, 150) + 'px'
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      console.log('submit message')
    }
  }

  return (
    <div className="message-area">
      {globalData?.insideNewChat ? <NewChatPage /> : ''}
      <textarea
        onKeyDown={onKeyDown}
        onChange={onMessageChange}
        className="message-text-field"
        name="message-text-field"
        placeholder="Message GPT..."
        rows={1}
      ></textarea>
    </div>
  )
}
