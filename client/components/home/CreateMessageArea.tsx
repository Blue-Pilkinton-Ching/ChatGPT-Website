import { FormEvent } from 'react'

export function CreateMessageArea() {
  function onMessageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <div className="message-area">
      <form onSubmit={onMessageSubmit}>
        <input type="text" className="message-text-field" />
      </form>
    </div>
  )
}
