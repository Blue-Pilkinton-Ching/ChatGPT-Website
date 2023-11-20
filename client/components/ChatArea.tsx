import { FormEvent } from 'react'
import { ChatAreaProps } from '../../Interfaces/interfaces.ts'

export default function ChatArea(props: ChatAreaProps) {
  function handleEnter(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    props.onOpenThreadsPanel()
  }

  return (
    <>
      <div className="chat-area">
        <button onClick={handleEnter} className="show-threads-panel"></button>
      </div>
    </>
  )
}
