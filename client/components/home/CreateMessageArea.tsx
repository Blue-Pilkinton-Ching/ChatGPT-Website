import { ChangeEvent, FormEvent } from 'react'

export function CreateMessageArea() {
  function onMessageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function onMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    console.log(event.target.scrollHeight)
    event.target.style.height = 'auto'
    event.target.style.height =
      Math.min(event.target.scrollHeight - 30, 150) + 'px'
  }

  return (
    <div className="message-area">
      <textarea
        onChange={onMessageChange}
        className="message-text-field"
        name="message-text-field"
        placeholder="Message GPT..."
        rows={1}
      ></textarea>
    </div>
  )
}
