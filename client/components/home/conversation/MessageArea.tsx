import { ChangeEvent, KeyboardEvent } from 'react'
import NewChatPage from './NewChatPage'
import { useGlobalState } from '../../../hooks/useGlobalState'
import { Assistant, Message, Thread } from '../../../../interfaces'
import * as db from 'firebase/firestore'
import { useGlobalRef } from '../../../hooks/useGlobalRef'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { MessageContentText } from 'openai/resources/beta/threads/index.mjs'

export function MessageArea() {
  const { globalState, setGlobalState } = useGlobalState()
  const [user] = useAuthState(getAuth())
  const globalRef = useGlobalRef()

  function onMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.style.height = 'auto'
    event.target.style.height =
      Math.min(event.target.scrollHeight - 30, 150) + 'px'
  }

  async function PollRun(threadID: string, runID: string) {
    const runStatus = await globalRef.openai.beta.threads.runs.retrieve(
      threadID,
      runID
    )

    if (runStatus.status === 'in_progress') {
      await PollRun(threadID, runID)
    } else {
      return runStatus
    }
  }

  async function GenerateNewChat(message: string) {
    setGlobalState({ ...globalState, insideNewChat: false })

    const thread = await globalRef.openai.beta.threads.create()

    await globalRef.openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message,
    })

    const assistant = globalRef.settings.assistants.find(
      (a) => a.isDefault
    ) as Assistant

    const run = await globalRef.openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    })

    await PollRun(thread.id, run.id)

    const messages = await globalRef.openai.beta.threads.messages.list(
      thread.id
    )

    const formattedMessages = messages.data.map((message) => {
      const messageContent = message.content[0] as MessageContentText
      const result: Message = {
        assistantID: message.assistant_id,
        content: messageContent.text.value,
        role: message.role,
        dateCreated: message.created_at,
      }
      return result
    })

    const threadData: Thread = {
      name: 'Loading...',
      id: thread.id,
      messages: formattedMessages,
    }

    const threadsDoc = db.doc(
      db.getFirestore(),
      `threads/${user?.uid}/conversations/${thread.id}`
    )

    await db.setDoc(threadsDoc, threadData).catch((e) => {
      console.error(e.message)
      alert('Failed to save thread')
    })

    console.log(threadData)

    setGlobalState({
      ...globalState,
      currentThread: threadData,
      insideNewChat: false,
    })
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault()

      const target = event.target as HTMLTextAreaElement
      const message = target.value
      target.value = ''

      if (globalState.insideNewChat) {
        GenerateNewChat(message)
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
