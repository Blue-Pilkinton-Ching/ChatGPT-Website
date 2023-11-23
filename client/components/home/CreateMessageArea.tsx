import { FormEvent } from 'react'

export function CreateMessageArea() {
  function onMessageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <div className="create-message">
      <form onSubmit={onMessageSubmit}>
        <input type="text" />
      </form>
    </div>
  )
}
