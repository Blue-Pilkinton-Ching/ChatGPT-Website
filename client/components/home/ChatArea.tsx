import { FormEvent } from 'react'
import { ChatAreaProps } from '../../../interfaces.ts'
import { CreateMessageArea } from './CreateMessageArea.tsx'

export default function ChatArea(props: ChatAreaProps) {
  function handleEnter(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    props.onOpenThreadsPanel()
  }

  return (
    <>
      <div className="chat-area">
        <button onClick={handleEnter} className="show-threads-panel">
          <div className="bar1 bar"></div>
          <div className="bar2 bar"></div>
          <div className="bar3 bar"></div>
        </button>
        <CreateMessageArea />
      </div>
    </>
  )
}
