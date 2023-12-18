import { ChangeEvent, KeyboardEvent } from 'react'
import NewChatPage from './NewChatPage'
import { useGlobalState } from '../../../hooks/useGlobalState'
import {
  Assistant,
  Message,
  Thread,
  ThreadHeader,
} from '../../../../interfaces'
import * as db from 'firebase/firestore'
import { useGlobalRef } from '../../../hooks/useGlobalRef'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { MessageContentText } from 'openai/resources/beta/threads/index.mjs'
import { Conversation } from './Conversation'

export function MessageArea() {
  const { globalState, setGlobalState } = useGlobalState()
  const [user] = useAuthState(getAuth())
  const globalRef = useGlobalRef()

  function ChangeTextAreaHeight(target: HTMLTextAreaElement) {
    target.style.height = 'auto'
    target.style.height = Math.min(target.scrollHeight - 30, 150) + 'px'

    setGlobalState((oldState) => ({
      ...oldState,
      messageTextAreaHeight: target.style.height,
    }))
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

  async function GenerateCompletion(
    threadID: string,
    message: string,
    assistantID: string
  ) {
    await globalRef.openai.beta.threads.messages.create(threadID, {
      role: 'user',
      content: message,
    })

    const run = await globalRef.openai.beta.threads.runs.create(threadID, {
      assistant_id: assistantID,
    })

    await PollRun(threadID, run.id)

    const response = await globalRef.openai.beta.threads.messages.list(threadID)

    return response
  }

  async function GenerateNewChat(message: string) {
    const thread = await globalRef.openai.beta.threads.create()

    const assistant = globalRef.settings.assistants.find(
      (a) => a.isDefault
    ) as Assistant

    if (assistant == undefined) {
      alert('Default assistant not found. Please try again later')
      throw new Error('Default assistant not found. Please try again later')
    }

    const newThread: Thread = {
      lastEdited: db.Timestamp.now().toMillis(),
      id: thread.id,
      messages: [],
    }

    GenerateMessage(newThread, message, assistant.id)
    GenerateHeader(message, newThread)
  }
  async function GenerateHeader(message: string, thread: Thread) {
    const newThread = await globalRef.openai.beta.threads.create()

    const assistant = globalRef.settings.assistants.find(
      (a) => a.name === 'Header Generator'
    ) as Assistant

    if (assistant == undefined) {
      alert('Header assistant not found. Please try again later')
      throw new Error('Header assistant not found. Please try again later')
    }

    const messages = await GenerateCompletion(
      newThread.id,
      message,
      assistant.id
    )

    const response = messages.data[0].content[0] as MessageContentText

    const header: ThreadHeader = {
      lastEdited: thread.lastEdited,
      name: response.text.value,
      threadID: thread.id,
    }
    const threadsHeaderDoc = db.doc(
      db.getFirestore(),
      `threads/${user?.uid}/headers/${thread.id}`
    )

    await db.setDoc(threadsHeaderDoc, header).catch((e) => {
      console.error(e.message)
      alert('Failed to save thread')
    })

    setGlobalState((oldState) => ({
      ...oldState,
      threadHeaders: [header, ...globalState.threadHeaders],
    }))
  }

  async function GenerateMessage(
    thread: Thread,
    message: string,
    assistantID: string
  ) {
    setGlobalState((oldState) => ({
      ...oldState,
      insideNewChat: false,
      currentThread: thread,
    }))

    const messages = await GenerateCompletion(thread.id, message, assistantID)

    const formattedMessages = messages.data.map((message) => {
      const messageContent = message.content[0] as MessageContentText
      const result: Message = {
        assistantID: message.assistant_id,
        content: messageContent.text.value,
        role: message.role,
      }
      return result
    })

    thread.messages = formattedMessages

    const threadsDoc = db.doc(
      db.getFirestore(),
      `threads/${user?.uid}/conversations/${thread.id}`
    )

    await db.setDoc(threadsDoc, thread).catch((e) => {
      console.error(e.message)
      alert('Failed to save thread')
    })
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault()

      const target = event.target as HTMLTextAreaElement
      const message = target.value
      target.value = ''

      ChangeTextAreaHeight(target)

      if (globalState.insideNewChat) {
        GenerateNewChat(message)
      } else {
        GenerateMessage(
          globalState.currentThread as Thread,
          message,
          globalRef.settings.assistants[0].id
        )
      }
    }
  }

  return (
    <div className="message-area">
      {globalState.insideNewChat ? <NewChatPage /> : <Conversation />}
      <textarea
        onKeyDown={onKeyDown}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          ChangeTextAreaHeight(event.target)
        }
        className="message-text-field text"
        name="message-text-field"
        placeholder="Message GPT..."
        rows={1}
      ></textarea>
    </div>
  )
}
