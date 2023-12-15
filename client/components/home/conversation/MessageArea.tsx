import { ChangeEvent, KeyboardEvent } from 'react'
import NewChatPage from './NewChatPage'
import { useGlobalData } from '../../../hooks/useGlobalState'
import { useGlobalRef } from '../../../hooks/useGlobalRef'

export function MessageArea() {
  const { globalState, setGlobalState } = useGlobalData()
  const globalRef = useGlobalRef()

  function onMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = 'auto'
    event.target.style.height =
      Math.min(event.target.scrollHeight - 30, 150) + 'px'
  }

  async function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      console.log('Submit Message')
      if (globalState.insideNewChat) {
        // New Chat
        setGlobalState({ ...globalState, insideNewChat: false })

        const target = event.target as HTMLTextAreaElement
        console.log(target.value)

        const thread = await globalRef.openai.beta.threads.create()

        await globalRef.openai.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: target.value,
        })

        const run = await globalRef.openai.beta.threads.runs.create(thread.id, {
          assistant_id: assistant.id,
        })

        const interval = setInterval(async () => {
          const runStatus = await globalRef.openai.beta.threads.runs.retrieve(
            thread.id,
            run.id
          )
          console.log(runStatus)
          if (runStatus.status === 'completed') {
            clearInterval(interval)

            const messages = await globalRef.openai.beta.threads.messages.list(
              thread.id
            )
            console.log(messages)
          }
        }, 500)
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
